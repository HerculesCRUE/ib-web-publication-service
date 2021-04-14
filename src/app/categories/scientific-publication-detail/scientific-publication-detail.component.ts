import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Direction, FindRequest, Order, Page, PageRequest, PaginatedSearchComponent } from 'src/app/_helpers/search';
import { BookSection } from 'src/app/_models/bookSection';
import { DocumentDetail } from 'src/app/_models/documentDetail';
import { DocumentService } from 'src/app/_services/document.service';
import { ScientificPublication } from '../../_models/scientificPublication';
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
