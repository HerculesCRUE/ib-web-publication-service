import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AbstractService } from 'src/app/_helpers/abstract';
import { Page, PageRequest } from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';
import { Event } from 'src/app/_models/event';
import { Graphic } from 'src/app/_models/graphic';
import { SparqlResults } from 'src/app/_models/sparql';




/**
 * mock service for statistic
 *
 * @export
 * @class MockStatisticService
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


    /**
     *
     *
     * @return {*} 
     * @memberof MockStatisticService
     */
    projectByClassification(): Observable<Array<Graphic>> {
        const returnedGrahic = [
            {
                "publishedIn": "",
                "count": "273",
                "projectClassification": null,
                "ownerOrganization": null,
                "subjectArea": null,
                "modality": null,
                "type": null,
                "hasKnowledgeAreatitle": null,
                "inheresInsubjectArea": null
            },
            {
                "publishedIn": "HAEMATOLOGICA",
                "count": "7",
                "projectClassification": null,
                "ownerOrganization": null,
                "subjectArea": null,
                "modality": null,
                "type": null,
                "hasKnowledgeAreatitle": null,
                "inheresInsubjectArea": null
            }];

        return of(returnedGrahic);
    }

    /**
     *
     *
     * @return {*} 
     * @memberof MockStatisticService
     */
    articlesByPublishedIn(): Observable<Array<Graphic>> {
        const returnedGraphic = [
            {
                "publishedIn": null,
                "count": "690",
                "projectClassification": "National",
                "ownerOrganization": null,
                "subjectArea": null,
                "modality": null,
                "type": null,
                "hasKnowledgeAreatitle": null,
                "inheresInsubjectArea": null
            },
            {
                "publishedIn": null, "count": "121",
                "projectClassification": "International",
                "ownerOrganization": null,
                "subjectArea": null,
                "modality": null,
                "type": null,
                "hasKnowledgeAreatitle": null,
                "inheresInsubjectArea": null
            }];
        return of(returnedGraphic);
    }



}
