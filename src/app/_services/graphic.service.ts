import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AbstractService } from '../_helpers/abstract';
import { Page } from '../_helpers/search';
import { Helper } from '../_helpers/utils';


/**
 *
 *
 * @export
 * @class GraphicService
 * @extends {AbstractService}
 */
@Injectable({
    providedIn: 'root',
})
export class GraphicService extends AbstractService {



    constructor(private httpClient: HttpClient) {
        super();
    }


    /**
     *
     *
     * @return {*}  {Observable<Page<any>>}
     * @memberof GraphicService
     */
    universityFinancing(): Observable<any> {
        return this.httpClient
            .get(Helper.getUrl('/university/financing')).pipe(
                catchError(this.handleError)
            );
    }

    /**
     *
     *
     * @return {*}  {Observable<Page<any>>}
     * @memberof GraphicService
     */
    universityQuality(): Observable<any> {
        return this.httpClient
            .get(Helper.getUrl('/university/quality')).pipe(
                catchError(this.handleError)
            );
    }
}
