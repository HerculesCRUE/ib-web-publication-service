import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AbstractService } from '../_helpers/abstract';
import { Helper } from '../_helpers/utils';
import { Graphic } from '../_models/graphic';



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
     * gets statistics for project by classification
     * @return {*}  {Observable<Graphic>}
     * @memberof StatisticService
     */
    projectByClassification(): Observable<Array<Graphic>> {

        return this.httpClient
            .get(Helper.getUrl('/statistics/projectByClassification')).pipe(
                catchError(this.handleError)
            );
    }

    /**
     *  
     *  gets statistics for articles by published in
     * @return {*}  {Observable<Array<Graphic>>}
     * @memberof StatisticService
     */
    articlesByPublishedIn(): Observable<Array<Graphic>> {

        return this.httpClient
            .get(Helper.getUrl('/statistics/articlesByPublishedIn')).pipe(
                catchError(this.handleError)
            );
    }


}
