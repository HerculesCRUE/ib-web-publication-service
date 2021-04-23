import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from '../_helpers/abstract';
import { Page, PageRequest } from '../_helpers/search';
import { Helper } from '../_helpers/utils';
import { SparqlResults } from '../_models/sparql';



/**
 *
 *
 * @export
 * @class DirectedJobsService
 * @extends {AbstractService}
 */
@Injectable({
    providedIn: 'root',
})
export class DirectedJobsService extends AbstractService {
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
                {
                    title: {
                        type: 'literal',
                        value: 'Optimización de software Lab II'
                    },
                    type: {
                        type: 'literal',
                        value: 'Tesis'
                    },
                    keywords: {
                        type: 'literal',
                        value: 'Informatica'
                    },
                    releaseYear: {
                        type: 'literal',
                        value: '2024'
                    }
                }
            ]
        }
    };



    constructor(private httpClient: HttpClient) {
        super();
    }



    /**
     *
     *
     * @param {Map<string, string>} filters
     * @param {PageRequest} pageRequest
     * @return {*}  {Page<SparqlResults>}
     * @memberof DirectedJobsService
     */
    find(filters: Map<string, string>, pageRequest: PageRequest): Page<SparqlResults> {
        const data: SparqlResults = JSON.parse(JSON.stringify(this.DUMMY_DATA));
        return Helper.findInServiceData(data, filters, pageRequest);
    }

    /**
     *
     *
     * @param {Map<string, string>} filters
     * @param {PageRequest} pageRequest
     * @return {*}  {Page<SparqlResults>}
     * @memberof DirectedJobsService
     */
    findByFilters(filters: Map<string, string>, pageRequest: PageRequest): Page<SparqlResults> {

        const data: SparqlResults = JSON.parse(JSON.stringify(this.DUMMY_DATA));

        return Helper.findInServiceData(data, filters, pageRequest);
    }

}
