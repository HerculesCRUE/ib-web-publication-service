import { Injectable } from '@angular/core';
import { FindRequest, Page } from '../_helpers/search';
import { AbstractService } from '../_helpers/abstract';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Helper } from '../_helpers/utils';
import { Observable } from 'rxjs';
import { Validator } from '../_models/validator';
import { catchError } from 'rxjs/operators';
import { Order, Direction } from '../_helpers/search';

@Injectable({
    providedIn: 'root',
})
export class ValidatorService extends AbstractService {

    constructor(private httpClient: HttpClient) {
        super();
    }

    /**
     *
     *
     * @param {FindRequest} findRequest
     * @return {*}  {Observable<Page<Validator>>}
     * @memberof ValidatorService
     */
    find(findRequest: FindRequest): Observable<Page<Validator>> {
        // Filter params
        let parameters = new HttpParams();
        parameters = Helper.addParam(parameters, 'type', findRequest.filter.type);


        if (findRequest && findRequest.pageRequest && !findRequest.pageRequest.property) {

            // we set default order (workaround!!!!). The view is a mess!!!
            const order = new Order();
            order.property = 'entity';
            order.direction = Direction.DESC;

            findRequest.setOrder(order.direction, order.property);
        }

        // Pagination params
        parameters = Helper.addPaginationParams(parameters, findRequest.pageRequest);
        return this.httpClient
            .get(Helper.getUrl('/validator/search'), {
                params: parameters
            }).pipe(
                catchError(this.handleError)
            );
    }

    save(query: any): Observable<any> {
        return this.httpClient
            .post(Helper.getUrl('/validator'), query)
            .pipe(catchError(this.handleError));
    }

    delete(id: string): Observable<any> {
        return this.httpClient
            .delete(Helper.getUrl('/validator/' + id))
            .pipe(catchError(this.handleError));
    }

    update(query: any): Observable<any> {
        return this.httpClient
            .put(Helper.getUrl('/validator'), query)
            .pipe(catchError(this.handleError));
    }
}

