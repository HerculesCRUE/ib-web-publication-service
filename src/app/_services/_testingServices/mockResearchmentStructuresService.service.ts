import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FindRequest, Page } from 'src/app/_helpers/search';
import { University } from 'src/app/_models/university';

/**
 *  Service for testiong patent service
 *
 * @export
 * @extends {AbstractService}
 */
@Injectable({
    providedIn: 'root',
})
export class MockResearchmentStructuresService {
    // mock data
    DATARESULT: any = [{
        id: 1,
        name: 'Universidad de Murcia'
    },
    {
        id: 2,
        name: 'Universidad de la Vida'
    },
    {
        id: 2,
        name: 'Universidad Complutense de Madrid'
    },
    {
        id: 3,
        name: 'Universidad de Oviedo'
    }];

    find(findRequest: FindRequest): Observable<Page<University>> {
        // Filter params
        const page: Page<University> = new Page<University>();
        let results: University[];
        results = this.DATARESULT;
        page.number = 0;
        page.numberOfElements = 10;
        page.size = 10;
        page.totalElements = 10;
        // TODO sort

        page.content = results;
        return of(page);
    }

    getById(id: string, type: string) {
        // Filter params
        return of({});
    }


}
