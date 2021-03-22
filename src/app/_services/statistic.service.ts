import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AbstractService } from '../_helpers/abstract';
import { FindRequest, Page } from '../_helpers/search';
import { Helper } from '../_helpers/utils';
import { Project } from '../_models/project';



/**
 *
 *
 * @export
 * @class StatisticService
 * @extends {AbstractService}
 */
@Injectable({
    providedIn: 'root',
})
export class StatisticService extends AbstractService {

    /**
     * Creates an instance of StatisticService.
     * @param {HttpClient} httpClient
     * @memberof StatisticService
     */
    constructor(private httpClient: HttpClient) {
        super();
    }



    /**
     *
     *
     * @return {*}  {Observable<any>}
     * @memberof StatisticService
     */
    topPatents(): Observable<any> {

        return this.httpClient
            .get(Helper.getUrl('/statistics/topPatents')).pipe(
                catchError(this.handleError)
            );
    }

    /**
     *
     *
     * @return {*}  {Observable<any>}
     * @memberof StatisticService
     */
    topPublications(): Observable<any> {

        return this.httpClient
            .get(Helper.getUrl('/statistics/topPublications')).pipe(
                catchError(this.handleError)
            );
    }

}
