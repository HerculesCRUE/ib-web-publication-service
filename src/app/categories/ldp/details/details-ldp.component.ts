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
                }, () => {
                });
            }
            );
    }

    validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }
}