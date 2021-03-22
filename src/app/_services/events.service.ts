import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AbstractService } from '../_helpers/abstract';
import { FindRequest, Page, PageRequest } from '../_helpers/search';
import { Helper } from '../_helpers/utils';
import { Event } from '../_models/event';
import { SparqlResults } from '../_models/sparql';


/**
 *
 *
 * @export
 * @class EventsService
 * @extends {AbstractService}
 */
@Injectable({
    providedIn: 'root',
})
export class EventsService extends AbstractService {




    constructor(private httpClient: HttpClient) {
        super();
    }



    /**
     *
     *
     * @param {Map<string, string>} filters
     * @param {PageRequest} pageRequest
     * @return {*}  {Page<SparqlResults>}
     * @memberof EventsService
     */
    find(findRequest: FindRequest): Observable<Page<Event>> {
        let parameters = new HttpParams();
        parameters = Helper.addParam(parameters, 'endDate', findRequest.filter.end);
        parameters = Helper.addParam(parameters, 'startDate', findRequest.filter.start);
        parameters = Helper.addParam(parameters, 'title', findRequest.filter.name);
        parameters = Helper.addParam(parameters, 'id', findRequest.filter.id);
        // Pagination params
        parameters = Helper.addPaginationParams(parameters, findRequest.pageRequest);

        return this.httpClient
            .get(Helper.getUrl('/event/search'), {
                params: parameters
            }).pipe(
                catchError(this.handleError)
            );
    }





}
