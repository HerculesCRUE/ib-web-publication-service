import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Direction, FindRequest, Order, Page, PageRequest, PaginatedSearchComponent } from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';
import { LdpRelatedSearchResult } from 'src/app/_models/LdpRelatedSearchResult';
import { LdpService } from 'src/app/_services/ldp.service';


export class Category {
    id: string
    name: string

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

/**
 *
 *
 * @export
 * @class SearchLdpResultComponent
 * @implements {OnInit}
 */@Component({
    selector: 'app-search-ldp-related-result',
    templateUrl: './search-ldp-related-result.component.html'
})
export class RelatedLdpComponent extends PaginatedSearchComponent<LdpRelatedSearchResult> {
    loaded = false;

    findRequest: FindRequest = new FindRequest();

    uri: string;

    categories: Array<Category> = [];

    category: string;

    @Input() type: string;

    constructor(
        private translateService: TranslateService,
        private researchmentStructureService: LdpService,
        router: Router,
        translate: TranslateService,
        toastr: ToastrService,
        private route: ActivatedRoute
    ) {
        super(router, translate, toastr);
        router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
    }

    ngOnInit() {
        this.route.queryParams
            .subscribe(params => {
                console.log(params);
                this.uri = params['uri'];
                if (this.loaded) {
                    this.filterResearchmentStructures();
                }
            }
            );
        this.researchmentStructureService.findRelatedCategories(this.uri, this.type).subscribe((data) => {
            let cats = data;

            this.translateService.get('ldp.category.values').subscribe((translations: any) => {
                cats.forEach(item => {
                    const relatedType = Helper.getLdpEntityName(item);
                    let name = null;
                    if (translations && translations[relatedType]) {
                        name = translations[relatedType].s;
                    }
                    this.categories.push(new Category(item, name ? name : relatedType));
                });
            });
        }, () => {
        });


    }

    protected findInternal(findRequest: FindRequest): Observable<Page<LdpRelatedSearchResult>> {
        const page: Page<LdpRelatedSearchResult> = new Page();
        let filters;
        if (this.category) {
            filters = "related," + this.category;
        }
        let method: Observable<Page<LdpRelatedSearchResult>> = this.researchmentStructureService.findRelated(this.uri, findRequest, this.type, filters);

        return method.pipe(
            map((x) => {
                this.loaded = true;
                return x;
            }), // return the received value true/false
            catchError((err) => {
                this.loaded = true;
                return of(page)
            }));
    }

    protected removeInternal(entity: any): Observable<any> {
        return of({});
    }

    protected getDefaultOrder(): Order {
        return {
            property: 'entity',
            direction: Direction.DESC
        };
    }

    /**
     * Filter researchment structures
     *
     * @param {string} filterName
     * @memberof SearchLdpResultComponent
     */
    filterResearchmentStructures() {
        this.findRequest.pageRequest.page = 0;
        this.loaded = false;
        let filters;
        if (this.category) {
            filters = "related," + this.category;
        }
        let method: Observable<Page<LdpRelatedSearchResult>> = this.researchmentStructureService.findRelated(this.uri, this.findRequest, this.type, filters);

        method.subscribe((data) => {
            this.resultObject = data;
            this.loaded = true;
        }, () => {
            this.loaded = true;
        });

    }

    /**
     * Function called on sortChanged event of TableResultsComponent
     *
     * @param {PageRequest} pageRequest
     * @memberof SearchLdpResultComponent
     */
    allResearchmentStructuresFilteredSortChanged(pageRequest: PageRequest): void {
        this.findRequest.pageRequest.property = pageRequest.property;
        this.findRequest.pageRequest.direction = pageRequest.direction;
        let filters;
        if (this.category) {
            filters = "related," + this.category;
        }
        let method: Observable<Page<LdpRelatedSearchResult>> = this.researchmentStructureService.findRelated(this.uri, this.findRequest, this.type, filters);

        method.subscribe((data) => {
            this.resultObject = data;
            this.loaded = true;
        }, () => {
            this.loaded = true;
        });
    }

    filter(value: string) {
        this.category = value;
        this.find();
    }

}