import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AbstractService } from '../_helpers/abstract';
import { Helper } from '../_helpers/utils';
import { ScientificPublication } from '../_models/scientificPublication';

/**
 *
 *
 * @export
 * @class ResearchStaffService
 * @extends {AbstractService}
 */
@Injectable({
    providedIn: 'root'
})
export class ScientificPublicationService extends AbstractService {

    constructor(private httpClient: HttpClient) {
        super();
    }

    getPerson(id: string): Observable<ScientificPublication> {
        return this.httpClient
            .get(Helper.getUrl('/scientificpublication/' + id)).pipe(
                catchError(this.handleError)
            );
    }
}
