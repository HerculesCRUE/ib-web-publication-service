import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LdpEntityDetails } from 'src/app/_models/ldpEntityDetails';
import { LdpService } from 'src/app/_services/ldp.service';

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
export class DetailsLdpComponent implements OnInit {

    details: LdpEntityDetails;

    loaded = false;

    constructor(
        private ldpService: LdpService,
        private route: ActivatedRoute
    ) {

    }

    ngOnInit(): void {
        this.route.queryParams
            .subscribe(params => {
                let uri = params['uri'];
                this.ldpService.findDetails(uri).subscribe((data) => {
                    this.details = data;
                    this.loaded = true;
                }, () => {
                    this.loaded = true;
                });
            }
            );
    }
}