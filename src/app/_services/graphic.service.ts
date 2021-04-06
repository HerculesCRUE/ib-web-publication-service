import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AbstractService } from '../_helpers/abstract';
import { Page } from '../_helpers/search';
import { Helper } from '../_helpers/utils';
import { GraphicModelTree } from '../_models/graphicModelTree';


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

    /**
     *
     *
     * @return {*}  {Observable<any>}
     * @memberof GraphicService
     */
    personArea(): Observable<any> {
        return this.httpClient
            .get(Helper.getUrl('/person/area')).pipe(
                catchError(this.handleError)
            );
    }

    /**
     *
     *
     * @return {*}  {Observable<any>}
     * @memberof GraphicService
     */
    patentArea(): Observable<any> {
        return this.httpClient
            .get(Helper.getUrl('/patent/area')).pipe(
                catchError(this.handleError)
            );
    }

    /**
     *
     *
     * @return {*}  {Observable<any>}
     * @memberof GraphicService
     */
    projectInvestigation(): Observable<Array<GraphicModelTree>> {
        return this.httpClient
            .get(Helper.getUrl('/project/byModality')).pipe(
                catchError(this.handleError)
            );
    }

    /**
     *
     *
     * @param {string} year
     * @return {*}  {Observable<any>}
     * @memberof GraphicService
     */
    projectAreasPerYear(year: string): Observable<any> {
        let parameters = new HttpParams();
        parameters = Helper.addParam(parameters, 'year', year);
        return this.httpClient
            .get(Helper.getUrl('/areas/projectArea'), {
                params: parameters
            }).pipe(
                catchError(this.handleError)
            );
    }

    /**
     *
     *
     * @param {string} year
     * @return {*}  {Observable<any>}
     * @memberof GraphicService
     */
    AreasPerYear(year: string): Observable<any> {
        let parameters = new HttpParams();
        parameters = Helper.addParam(parameters, 'year', year);
        return this.httpClient
            .get(Helper.getUrl('/areas/yearArea'), {
                params: parameters
            }).pipe(
                catchError(this.handleError)
            );
    }


}
