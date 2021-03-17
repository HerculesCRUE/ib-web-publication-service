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
export class MockGraphicService extends AbstractService {



    constructor() {
        super();
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
}
