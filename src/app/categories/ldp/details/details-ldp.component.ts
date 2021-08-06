import { AfterViewInit, Component, ElementRef, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LdpEntityDetails } from 'src/app/_models/ldpEntityDetails';
import { LdpService } from 'src/app/_services/ldp.service';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';

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
})
export class DetailsLdpComponent implements OnInit, AfterViewInit {

    details: LdpEntityDetails;

    loaded = false;

    dataObservable: Observable<LdpEntityDetails>;

    constructor(
        private ldpService: LdpService,
        private route: ActivatedRoute,
        @Inject(DOCUMENT) private document,
        private elementRef: ElementRef
    ) {

    }

    ngOnInit(): void {
        this.route.queryParams
            .subscribe(params => {
                let uri = params['uri'];
                this.dataObservable = this.ldpService.findDetails(uri);
                this.dataObservable.subscribe((data) => {
                    this.details = data;
                    this.loaded = true;
                }, () => {
                    this.loaded = true;
                });
            }
            );
    }

    ngAfterViewInit() {
        this.dataObservable.subscribe((data) => {
            const s = this.document.createElement('script');
            s.type = 'application/ld+json';
            s.innerText = JSON.stringify(JSON.parse(data.jsonLd));
            this.elementRef.nativeElement.appendChild(s);
        }, () => {
        });
    }

    validURL(str: string) {
        var urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

        let isUrl = !!urlPattern.test(str);

        var uuidPattern = new RegExp('^.*[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$', 'i'); // fragment locator

        let isUUID = !!uuidPattern.test(str);

        return isUrl && isUUID;
    }
}