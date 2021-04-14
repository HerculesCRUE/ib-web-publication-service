import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { AbstractService } from 'src/app/_helpers/abstract';
import { Page, PageRequest } from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';
import { Event } from 'src/app/_models/event';
import { SparqlResults } from 'src/app/_models/sparql';



/**
 *  testing
 *
 * @export
 * @class EventsService
 * @extends {AbstractService}
 */
@Injectable({
    providedIn: 'root',
})
export class MockStatisticService extends AbstractService {
    // mock data



    constructor() {
        super();
    }


    projectByClassification() {
        return of({});
    }

    articlesByPublishedIn() {
        return of({});
    }

    topPublications() {
        return of({});
    }


}
