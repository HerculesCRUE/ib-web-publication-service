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
export class MockEventsService extends AbstractService {
    // mock data
    readonly DUMMY_DATA: Event[] = [
        {
            id: '',
            title: '',
            type: '',
            date: '',
            locality: '',
        }
    ];



    constructor() {
        super();
    }



    /**
     *
     *
     * @param {Map<string, string>} filters
     * @param {PageRequest} pageRequest
     * @return {*}  {Page<SparqlResults>}
     * @memberof EventsService
     */
    find(findrequest) {
        const page: Page<Event> = new Page<Event>();
        const results: Event[] = this.DUMMY_DATA;
        page.number = 0;
        page.numberOfElements = 10;
        page.size = 10;
        page.totalElements = 10;
        // TODO sort
        page.content = results;
        return of(page);
    }


    geteventByIdAndType(id: string, type: string) {

        return of({});
    }


}
