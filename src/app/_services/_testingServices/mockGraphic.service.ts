import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AbstractService } from 'src/app/_helpers/abstract';



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
export class MockGraphicService {



    constructor() {
    }


    /**
     *
     *
     * @return {*}  {Observable<Page<any>>}
     * @memberof GraphicService
     */
    universityFinancing(): Observable<any> {
        return of();
    }

    /**
     *
     *
     * @return {*}  {Observable<Page<any>>}
     * @memberof GraphicService
     */
    universityQuality(): Observable<any> {
        return of();
    }


    personArea(): Observable<any> {
        return of();
    }

    patentArea(): Observable<any> {
        return of();
    }

    projectInvestigation(): Observable<any> {
        return of();
    }

    projectAreasPerYear(): Observable<any> {
        return of();
    }

    AreasPerYear(): Observable<any> {
        return of();
    }
}
