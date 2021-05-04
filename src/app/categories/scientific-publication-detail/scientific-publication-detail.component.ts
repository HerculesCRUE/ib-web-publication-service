import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScientificPublicationService } from '../../_services/scientific-publication.service';

/**
 *
 *
 * @export
 * @class ScientificPublicationDetailComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'app-scientific-publication-detail',
    templateUrl: './scientific-publication-detail.component.html'
})
export class ScientificPublicationDetailComponent implements OnInit {


    /**
     *
     *
     * @type {*}
     * @memberof DocumentDetailComponent
     */
    publication: any;
    loaded: boolean;

    constructor(
        private scientificPublicationService: ScientificPublicationService,
        private rutaActiva: ActivatedRoute,
        private _location: Location,
    ) {

    }

    ngOnInit(): void {
        const id = this.rutaActiva.snapshot.params.id;

        this.scientificPublicationService.get(id).subscribe((result) => {
            this.publication = result;
            this.loaded = true;
        });
    }

    backClicked() {
        this._location.back();
    }
}
