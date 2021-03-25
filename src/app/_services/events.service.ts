import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AbstractService } from '../_helpers/abstract';
import { FindRequest, Page, PageRequest } from '../_helpers/search';
import { Helper } from '../_helpers/utils';
import { Event } from '../_models/event';
import { EventDetail } from '../_models/eventDetail';
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
        parameters = Helper.addParam(parameters, 'date', findRequest.filter.start);
        parameters = Helper.addParam(parameters, 'types', findRequest.filter.type);
        parameters = Helper.addParam(parameters, 'id', findRequest.filter.id);
        parameters = Helper.addParam(parameters, 'participantId', findRequest.filter.participantId);
        // Pagination params
        parameters = Helper.addPaginationParams(parameters, findRequest.pageRequest);

        return this.httpClient
            .get(Helper.getUrl('/event/search'), {
                params: parameters
            }).pipe(
                catchError(this.handleError)
            );
    }

    geteventByIdAndType(id: string, type: string): Observable<EventDetail> {

        return this.httpClient
            .get(Helper.getUrl('/event/' + id + '/' + type)).pipe(
                catchError(this.handleError)
            );
    }

    getConferenceByParticipantID(findRequest: FindRequest): Observable<Page<Event>> {
        let parameters = new HttpParams();
        parameters = Helper.addParam(parameters, 'date', findRequest.filter.start);
        parameters = Helper.addParam(parameters, 'types', findRequest.filter.type);
        parameters = Helper.addParam(parameters, 'participantId', findRequest.filter.participantId);
        // Pagination params
        parameters = Helper.addPaginationParams(parameters, findRequest.pageRequest);

        return this.httpClient
            .get(Helper.getUrl('/conference/search'), {
                params: parameters
            }).pipe(
                catchError(this.handleError)
            );
    }



}
