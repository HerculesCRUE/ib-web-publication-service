import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AbstractService } from '../_helpers/abstract';
import { FindRequest, Page } from '../_helpers/search';
import { Helper } from '../_helpers/utils';
import { Patent } from '../_models/patent';
import { PatentDetail } from '../_models/patentDetail';


/**
 *
 *
 * @export
 * @class PatentService
 * @extends {AbstractService}
 */
@Injectable({
    providedIn: 'root',
})
export class PatentService extends AbstractService {


    /**
     * Creates an instance of ProjectService.
     * param {HttpClient} httpClient
     * memberof ProjectService
     */
    constructor(private httpClient: HttpClient) {
        super();
    }

    /**
     *
     *
     * @param {Map<string, string>} filters
     * @param {PageRequest} pageRequest
     * @return {*}  {Page<SparqlResults>}
     * @memberof ProjectService
     */
    find(findRequest: FindRequest): Observable<Page<Patent>> {
        // Filter params
        let parameters = new HttpParams();
        parameters = Helper.addParam(parameters, 'tipo', findRequest.filter.type);
        parameters = Helper.addParam(parameters, 'title', findRequest.filter.name);
        parameters = Helper.addParam(parameters, 'startDate', findRequest.filter.ini);
        parameters = Helper.addParam(parameters, 'endDate', findRequest.filter.fin);
        parameters = Helper.addParam(parameters, 'authorId', findRequest.filter.authorId);
        parameters = Helper.addParam(parameters, 'organizationId', findRequest.filter.organizationId);

        // Pagination params
        parameters = Helper.addPaginationParams(parameters, findRequest.pageRequest);

        return this.httpClient
            .get(Helper.getUrl('/patent/search'), {
                params: parameters
            }).pipe(
                catchError(this.handleError)
            );
    }


    /**
     *
     *
     * @param {string} id
     * @return {*}  {Observable<PatentDetail>}
     * @memberof PatentService
     */
    getPatent(id: string): Observable<PatentDetail> {
        return this.httpClient
            .get(Helper.getUrl('/patent/' + id),).pipe(
                catchError(this.handleError)
            );
    }
}
