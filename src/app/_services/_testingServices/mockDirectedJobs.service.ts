import { Injectable } from '@angular/core';
import { AbstractService } from 'src/app/_helpers/abstract';
import { Page, PageRequest } from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';
import { SparqlResults } from 'src/app/_models/sparql';






/**
 *
 *  testing
 * @export
 * @class MockDirectedJobsService
 * @extends {AbstractService}
 */
@Injectable({
    providedIn: 'root',
})
export class MockDirectedJobsService extends AbstractService {
    // mock data
    readonly DUMMY_DATA: SparqlResults = {
        head: {
            vars: [
                'title',
                'type',
                'keywords',
                'releaseYear'
            ]
        },
        results: {
            bindings: [
                // 1
                {
                    title: {
                        type: 'literal',
                        value: 'Optimización de software'
                    },
                    type: {
                        type: 'literal',
                        value: 'Tesis'
                    },
                    keywords: {
                        type: 'literal',
                        value: 'Álgebra'
                    },
                    releaseYear: {
                        type: 'literal',
                        value: '2012'
                    }
                },
            ]
        }
    };


    constructor() {
        super();
    }



    /**
     *
     *
     * @param {Map<string, string>} filters
     * @param {PageRequest} pageRequest
     * @return {*}  {Page<SparqlResults>}
     * @memberof MockDirectedJobsService
     */
    find(filters: Map<string, string>, pageRequest: PageRequest): Page<SparqlResults> {
        const data: SparqlResults = JSON.parse(JSON.stringify(this.DUMMY_DATA));
        return Helper.findInServiceData(data, filters, pageRequest);
    }

    findByFilters(filters: Map<string, string>, pageRequest: PageRequest): Page<SparqlResults> {

        const data: SparqlResults = JSON.parse(JSON.stringify(this.DUMMY_DATA));

        return Helper.findInServiceData(data, filters, pageRequest);
    }

}
