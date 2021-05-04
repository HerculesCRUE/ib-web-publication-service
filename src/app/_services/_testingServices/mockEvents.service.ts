import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { AbstractService } from 'src/app/_helpers/abstract';
import { Page } from 'src/app/_helpers/search';
import { Event } from 'src/app/_models/event';



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

        page.content = results;
        return of(page);
    }


    geteventByIdAndType(id: string, type: string) {

        return of({});
    }

    getConferenceByParticipantID(findrequest) {
        const page: Page<Event> = new Page<Event>();
        const results: Event[] = this.DUMMY_DATA;
        page.number = 0;
        page.numberOfElements = 10;
        page.size = 10;
        page.totalElements = 10;

        page.content = results;
        return of(page);
    }

}
