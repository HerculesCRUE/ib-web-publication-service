import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AbstractService } from 'src/app/_helpers/abstract';
import { Page } from 'src/app/_helpers/search';
import { SparqlQuery } from 'src/app/_models/sparqlQuery';


/**
 *
 *
 * @export
 * @class MockSparql
 * @extends {AbstractService}
 */
@Injectable({
    providedIn: 'root',
})
export class MockSparql extends AbstractService {



    constructor() {
        super();
    }

    find(): Observable<Page<SparqlQuery>> {
        const page: Page<SparqlQuery> = new Page<SparqlQuery>();
        page.number = 0;
        page.numberOfElements = 10;
        page.size = 10;
        page.totalElements = 10;
        // TODO sort
        return of(page);
    }



}
