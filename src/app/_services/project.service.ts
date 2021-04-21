import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AbstractService } from '../_helpers/abstract';
import { FindRequest, Page } from '../_helpers/search';
import { Helper } from '../_helpers/utils';
import { Project } from '../_models/project';

/**
 *  Service for scientific production
 *
 * @export
 * @extends {AbstractService}
 */
@Injectable({
    providedIn: 'root',
})
export class ProjectService extends AbstractService {
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
    find(findRequest: FindRequest): Observable<Page<Project>> {
        // Filter params
        let parameters = new HttpParams();
        parameters = Helper.addParam(parameters, 'endDate', findRequest.filter.end);
        parameters = Helper.addParam(parameters, 'startDate', findRequest.filter.start);
        parameters = Helper.addParam(parameters, 'title', findRequest.filter.name);
        parameters = Helper.addParam(parameters, 'id', findRequest.filter.id);
        parameters = Helper.addParam(parameters, 'authorId', findRequest.filter.authorId);
        // Pagination params
        parameters = Helper.addPaginationParams(parameters, findRequest.pageRequest);

        return this.httpClient
            .get(Helper.getUrl('/project/search'), {
                params: parameters
            }).pipe(
                catchError(this.handleError)
            );
    }


    findbyId(id: string): Observable<Project> {
        // Filter params


        return this.httpClient
            .get(Helper.getUrl('/project/' + id)).pipe(
                catchError(this.handleError)
            );
    }

}
