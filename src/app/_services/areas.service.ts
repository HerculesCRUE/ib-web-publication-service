import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AbstractService } from '../_helpers/abstract';
import { FindRequest, Page } from '../_helpers/search';
import { Helper } from '../_helpers/utils';
import { KnowledgeArea } from '../_models/KnowledgeArea';


@Injectable({
    providedIn: 'root',
})
export class AreasService extends AbstractService {


    constructor(private httpClient: HttpClient) {
        super();
    }




    find(findRequest: FindRequest): Observable<Page<KnowledgeArea>> {
        // Filter params
        let parameters = new HttpParams();
        parameters = Helper.addParam(parameters, 'types', findRequest.filter.types);
        parameters = Helper.addParam(parameters, 'title', findRequest.filter.name);
        parameters = Helper.addParam(parameters, 'dateFrom', findRequest.filter.yearFrom);
        parameters = Helper.addParam(parameters, 'dateTo', findRequest.filter.yearTo);
        parameters = Helper.addParam(parameters, 'authorId', findRequest.filter.authorId);
        parameters = Helper.addParam(parameters, 'organizationId', findRequest.filter.organizationId);

        // Pagination params
        parameters = Helper.addPaginationParams(parameters, findRequest.pageRequest);

        return this.httpClient
            .get(Helper.getUrl('/knowledgearea/search'), {
                params: parameters
            }).pipe(
                catchError(this.handleError)
            );
    }

    /**
     *
     *
     * @return {*}  {Observable<any>}
     * @memberof AreasService
     */
    getAll(): Observable<any> {
        return this.httpClient
            .get(Helper.getUrl('/knowledgearea/all')).pipe(
                catchError(this.handleError)
            );
    }



}
