import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { AbstractService } from "../_helpers/abstract";
import { Direction, FindRequest, Order, Page } from "../_helpers/search";
import { Helper } from "../_helpers/utils";
import { LdpEntityCounter } from "../_models/ldpEntity";
import { LdpEntityDetails } from "../_models/ldpEntityDetails";
import { LdpSearchResult } from "../_models/ldpSearchResult";

@Injectable({
    providedIn: 'root',
})
export class LdpService extends AbstractService {

    constructor(private httpClient: HttpClient) {
        super();
    }

    /**
     *
     *
     * @param {FindRequest} findRequest
     * @return {*}  {Observable<Page<LdpEntityCounter>>}
     * @memberof DataImporterService
     */
    find(findRequest: FindRequest): Observable<Page<LdpEntityCounter>> {
        // Filter params
        let parameters = new HttpParams();
        parameters = Helper.addParam(parameters, 'type', findRequest.filter.type);


        if (findRequest && findRequest.pageRequest && !findRequest.pageRequest.property) {

            // we set default order (workaround!!!!). The view is a mess!!!
            const order = new Order();
            order.property = 'count';
            order.direction = Direction.DESC;

            findRequest.setOrder(order.direction, order.property);
        }

        // Pagination params
        parameters = Helper.addPaginationParams(parameters, findRequest.pageRequest);
        return this.httpClient
            .get(Helper.getUrl('/ldp/count'), {
                params: parameters
            }).pipe(
                catchError(this.handleError)
            );
    }

    /**
     *
     *
     * @param {FindRequest} findRequest
     * @return {*}  {Observable<Page<LdpEntityCounter>>}
     * @memberof DataImporterService
     */
    findByTitle(title: string, findRequest: FindRequest): Observable<Page<LdpSearchResult>> {
        // Filter params
        let parameters = new HttpParams();
        parameters = Helper.addParam(parameters, 'title', title);


        if (findRequest && findRequest.pageRequest && !findRequest.pageRequest.property) {

            // we set default order (workaround!!!!). The view is a mess!!!
            const order = new Order();
            order.property = 'title';
            order.direction = Direction.DESC;

            findRequest.setOrder(order.direction, order.property);
        }

        // Pagination params
        parameters = Helper.addPaginationParams(parameters, findRequest.pageRequest);
        return this.httpClient
            .get(Helper.getUrl('/ldp/findTitle'), {
                params: parameters
            }).pipe(
                catchError(this.handleError)
            );
    }

    /**
     *
     *
     * @param {FindRequest} findRequest
     * @return {*}  {Observable<Page<LdpEntityCounter>>}
     * @memberof DataImporterService
     */
    findByCategory(category: string, findRequest: FindRequest): Observable<Page<LdpSearchResult>> {
        // Filter params
        let parameters = new HttpParams();
        parameters = Helper.addParam(parameters, 'category', category);


        if (findRequest && findRequest.pageRequest && !findRequest.pageRequest.property) {

            // we set default order (workaround!!!!). The view is a mess!!!
            const order = new Order();
            order.property = 'title';
            order.direction = Direction.DESC;

            findRequest.setOrder(order.direction, order.property);
        }

        // Pagination params
        parameters = Helper.addPaginationParams(parameters, findRequest.pageRequest);
        return this.httpClient
            .get(Helper.getUrl('/ldp/findCategory'), {
                params: parameters
            }).pipe(
                catchError(this.handleError)
            );
    }

    findDetails(uri: string): Observable<LdpEntityDetails> {
        let parameters = new HttpParams();
        parameters = Helper.addParam(parameters, 'uri', uri);

        return this.httpClient
            .get(Helper.getUrl('/ldp/findDetails'), {
                params: parameters
            }).pipe(
                catchError(this.handleError)
            );
    }


}