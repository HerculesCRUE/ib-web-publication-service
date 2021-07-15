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
            s.innerText = data.jsonLd;
            this.elementRef.nativeElement.appendChild(s);
        }, () => {
        });
    }
}