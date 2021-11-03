import { AfterViewInit, Component, ElementRef, Inject, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LdpEntityDetails } from 'src/app/_models/ldpEntityDetails';
import { LdpService } from 'src/app/_services/ldp.service';
import { DOCUMENT } from '@angular/common';
import { Observable, Subscription, Subscriber, Subject } from 'rxjs';
import { Helper } from 'src/app/_helpers/utils';
import { LdpEntityDetail } from 'src/app/_models/LdpEntityDetail';
import { TranslateService } from '@ngx-translate/core';

/**
 *
 *
 * @export
 * @class DetailsLdpComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'app-details-ldp',
    templateUrl: './details-ldp.component.html',
    styleUrls: ['./details-ldp.component.css']
})
export class DetailsLdpComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

    private detailsSubscription: Subscription;
    private detailsSubject: Subject<LdpEntityDetails>;
    details: LdpEntityDetails;
    relations: Array<{ propertyName: string, values: Array<LdpEntityDetails> }> = [];

    private entityCategoryKey = '22-rdf-syntax-ns#type';
    private entityValidKeyNames = ['name', 'title', 'correspondingAuthor', 'id'];

    private uri: string;
    uriCopied: boolean;

    loaded = false;

    categoryName: string;
    categoryURI: string;

    entityName: string;

    constructor(
        private ldpService: LdpService,
        private route: ActivatedRoute,
        private translateService: TranslateService,
        @Inject(DOCUMENT) private document,
        private elementRef: ElementRef
    ) {

    }

    ngOnInit(): void {
        this.route.queryParams
            .subscribe(params => {

                this.reset();

                this.uri = params['uri'];
                this.findDetails(this.uri).subscribe((data) => {

                    this.translateService.get(['ldp.category.values', 'ldp.properties']).subscribe((translations: any) => {
                        const categoryTranslations = translations['ldp.category.values'];
                        const propertyTranslations = translations['ldp.properties'];

                        this.categoryName = Helper.getLdpEntityName(this.uri, -2);
                        if (categoryTranslations && categoryTranslations[this.categoryName]) {
                            this.categoryName = categoryTranslations[this.categoryName].s;
                        }

                        this.categoryURI = Helper.getLdpEntityURI(this.uri, -2);

                        this.details = data;

                        const relationsByUri: Record<string, LdpEntityDetails> = {};
                        const relationsByKey: Record<string, Array<LdpEntityDetails>> = {};
                        const relationKeys: Array<string> = [];

                        if (this.details.relations) {

                            this.details.relations.forEach(relation => {
                                if (relation.properties) {
                                    relation.properties = this.handleProperties(relation.properties, propertyTranslations);
                                }
                                (<any>relation).relationName = this.getValidName(relation.properties, relation.uri);
                                relationsByUri[relation.uri] = relation;
                            });
                        }

                        if (this.details.properties) {
                            this.details.properties = this.handleProperties(this.details.properties, propertyTranslations);

                            const properties = [];
                            this.details.properties.forEach(property => {

                                const propertyKeyName = (<any>property).keyName;

                                if (propertyKeyName === this.entityCategoryKey) {
                                    (<any>property).categoryURI = property.value;

                                    let name = Helper.getLdpEntityName(property.value);
                                    if (categoryTranslations && categoryTranslations[name]) {
                                        name = categoryTranslations[name].s;
                                    }
                                    if (name) {
                                        property.value = name;
                                    }
                                }

                                const relation = relationsByUri[property.value];
                                if (relation) {
                                    let keyRelations = relationsByKey[propertyKeyName];
                                    if (!keyRelations) {
                                        keyRelations = [];
                                        relationsByKey[propertyKeyName] = keyRelations;
                                        relationKeys.push(propertyKeyName);
                                    }
                                    keyRelations.push(relation);
                                } else if (propertyKeyName !== 'id') {
                                    properties.push(property);
                                }
                            });
                            this.details.properties = properties;

                            this.entityName = this.getValidName(this.details.properties, '');
                        }

                        this.relations = [];
                        relationKeys.forEach(key => {
                            const relations = relationsByKey[key];
                            const propertyName = this.getPropertyTranslation(key, propertyTranslations, true);
                            this.relations.push({ propertyName: propertyName, values: relations });
                        });

                        this.loaded = true;

                    });

                }, () => {
                    this.loaded = true;
                });
            }
            );
    }

    ngAfterViewInit() {
        this.findDetails(this.uri).subscribe((data) => {
            const s = this.document.createElement('script');
            s.type = 'application/ld+json';
            s.innerText = JSON.stringify(JSON.parse(data.jsonLd));
            this.elementRef.nativeElement.appendChild(s);
        }, () => {
        });
    }

    ngOnChanges(changes: any): void {
    }

    ngOnDestroy(): void {
        this.reset();
    }

    private reset(): void {
        if (this.detailsSubscription) {
            this.detailsSubscription.unsubscribe();
            this.detailsSubscription = null;
        }
        if (this.detailsSubject) {
            this.detailsSubject.unsubscribe();
            this.detailsSubject = null;
        }
        this.details = null;
        this.relations = null;
        this.uri = null;
        this.loaded = false;
        this.categoryName = null;
        this.categoryURI = null;
    }

    private handleProperties(properties: Array<LdpEntityDetail>, translations: any) {
        const newProperties = [];
        if (properties) {
            properties.forEach(property => {
                if (property.value) {
                    const keyName = Helper.getLdpEntityName(property.key);
                    (<any>property).keyName = keyName;
                    (<any>property).propertyName = this.getPropertyTranslation(keyName, translations);
                    newProperties.push(property);
                }
            });
        }
        return newProperties;
    }

    private getPropertyTranslation(keyName: string, translations: any, plural?: boolean) {
        let propertyName = translations[keyName];
        if (propertyName) {
            if (!(typeof propertyName === 'string' || propertyName instanceof String)) {
                propertyName = plural ? propertyName.p : propertyName.s;
            }
        }
        return propertyName ? propertyName : keyName;
    }

    private getValidName(properties: Array<LdpEntityDetail>, defaultName: string): string {
        let name = defaultName;
        const nameKeys = {};
        properties.filter(r => this.entityValidKeyNames.some(k => k === (<any>r).keyName)).forEach(r => nameKeys[(<any>r).keyName] = r.value);
        const validKeyName = this.entityValidKeyNames.find(key => nameKeys[key]);
        if (validKeyName) {
            name = nameKeys[validKeyName];
        }
        return name;
    }

    private findDetails(uri: string): Observable<LdpEntityDetails> {
        if (!this.detailsSubject) {
            this.detailsSubject = new Subject<LdpEntityDetails>();
        }
        if (this.details) {
            this.detailsSubject.next(this.details);
        } else if (!this.detailsSubscription || this.detailsSubscription.closed) {
            this.detailsSubscription = this.ldpService.findDetails(uri).subscribe(data => {
                this.detailsSubject.next(data);
            }, () => {
                this.detailsSubject.error(null);
            });
        }
        return this.detailsSubject;
    }

    validURL(str: string) {
        try {
            var urlPattern = /^(?:(http(s)?)?(sftp)?(ftp)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
            let isUrl = !!urlPattern.test(str);

            const uuidPattern = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
            let isUiid = !!uuidPattern.test(str)

            return isUrl && isUiid;
        } catch (err) {
            console.log(str + ' error ' + err)
        }
        return false;
    }

    copyURI(uri: string) {
        navigator.clipboard.writeText(uri).then(() => {
            this.uriCopied = true;
        }, (err) => {

        });
    }

    back() {
        window.history.back();
    }
}