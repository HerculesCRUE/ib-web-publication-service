import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FindRequest, Page } from 'src/app/_helpers/search';
import { Patent } from 'src/app/_models/patent';
import { Person } from 'src/app/_models/person';
import { PersonDetail } from 'src/app/_models/personDetail';


/**
 *
 *
 * @export
 * @class MockResearchStaffService
 */
@Injectable({
    providedIn: 'root',
})
export class MockResearchStaffService {
    // mock data

    DUMMY_DATA: Person[] = [
        {
            id: '142006',
            title: '',
            birthDate: '',
            description: '',
            firstName: '',
            gender: '',
            hasContactInfo: '',
            homepage: '',
            image: '',
            name: '',
            nickname: '',
            personalMaibox: '',
            researchLine: '',
            surname: '',
            taxId: '',
            subjectArea: ''
        },
        {
            id: '148071',
            title: '',
            birthDate: '',
            description: '',
            firstName: '',
            gender: '',
            hasContactInfo: '',
            homepage: '',
            image: '',
            name: '',
            nickname: '',
            personalMaibox: '',
            researchLine: '',
            surname: '',
            taxId: '',
            subjectArea: ''
        },
        {
            id: '603742',
            title: '',
            birthDate: '',
            description: '',
            firstName: '',
            gender: '',
            hasContactInfo: '',
            homepage: '',
            image: '',
            name: '',
            nickname: '',
            personalMaibox: '',
            researchLine: '',
            surname: '',
            taxId: '',
            subjectArea: ''
        },
        {
            id: '12019',
            title: '',
            birthDate: '',
            description: '',
            firstName: '',
            gender: '',
            hasContactInfo: '',
            homepage: '',
            image: '',
            name: '',
            nickname: '',
            personalMaibox: '',
            researchLine: '',
            surname: '',
            taxId: '',
            subjectArea: ''
        },
        {
            id: '60203',
            title: '',
            birthDate: '',
            description: '',
            firstName: '',
            gender: '',
            hasContactInfo: '',
            homepage: '',
            image: '',
            name: '',
            nickname: '',
            personalMaibox: '',
            researchLine: '',
            surname: '',
            taxId: '',
            subjectArea: ''
        }
    ];

    DUMMY_DATA_DETAIL: PersonDetail[] = [
        {
            id: '142006',
            title: '',
            birthDate: '',
            description: '',
            firstName: '',
            gender: '',
            hasContactInfo: '',
            homepage: '',
            image: '',
            name: '',
            nickname: '',
            personalMaibox: '',
            researchLine: '',
            surname: '',
            taxId: '', subjectArea: ''
        }
    ];

    /**
     *
     *
     * @param {FindRequest} findRequest
     * @return {*}  {Observable<Page<Person>>}
     * @memberof MockResearchStaffService
     */
    find(findRequest: FindRequest): Observable<Page<Person>> {
        // Filter params
        const page: Page<Person> = new Page<Person>();
        const results: Person[] = this.DUMMY_DATA;
        page.number = 0;
        page.numberOfElements = 10;
        page.size = 10;
        page.totalElements = 10;
        // TODO sort

        page.content = results;
        return of(page);
    }


    getPerson() {
        return of(this.DUMMY_DATA_DETAIL);
    }




}
