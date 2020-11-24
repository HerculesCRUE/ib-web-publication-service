import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from '../_helpers/abstract';
import { Direction, Page, PageRequest } from '../_helpers/search';
import { Binding, SparqlResults } from '../_models/sparql';

/**
 *  Service for scientific production
 *
 * @export
 * @extends {AbstractService}
 */
@Injectable({
    providedIn: 'root',
})
export class ScientificProductionService extends AbstractService {
    // mock data
    readonly DUMMY_DATA: SparqlResults = {
        head: {
            vars: [
                'title',
                'type',
                'doi',
                'releaseYear'
            ]
        },
        results: {
            bindings: [
                // 1
                {
                    title: {
                        type: 'literal',
                        value: 'Guía practica para la realización de trabajos de fin de grado y trabajos fin de master'
                    },
                    type: {
                        type: 'literal',
                        value: 'Libro'
                    },
                    doi: {
                        type: 'literal',
                        value: 'xxxxx'
                    },
                    releaseYear: {
                        type: 'literal',
                        value: '2012'
                    }
                },
                // 2
                {
                    title: {
                        type: 'literal',
                        value: 'Buenas prácticas para la docencia del derecho adaptado al ECTS'
                    },
                    type: {
                        type: 'literal',
                        value: 'Guía'
                    },
                    doi: {
                        type: 'literal',
                        value: 'xxxxx'
                    },
                    releaseYear: {
                        type: 'literal',
                        value: '2010'
                    }
                },
                // 3
                {
                    title: {
                        type: 'literal',
                        value: 'Dimensión social de la conservación de la fauna silvestre'
                    },
                    type: {
                        type: 'literal',
                        value: 'Guía'
                    },
                    doi: {
                        type: 'literal',
                        value: 'xxxxx'
                    },
                    releaseYear: {
                        type: 'literal',
                        value: '2013'
                    }
                }
            ]
        }
    };

    /**
     * Creates an instance of ScientificProductionService.
     * param {HttpClient} httpClient
     * memberof ScientificProductionService
     */
    constructor(private httpClient: HttpClient) {
        super();
    }


    /**
     *
     *
     * @param {Map<string, string>} filters
     * @param {PageRequest} pageRequest
     * @return {*}  {Page<SparqlResults>}
     * @memberof ScientificProductionService
     */
    findScientificProductionByFilters(filters: Map<string, string>, pageRequest: PageRequest): Page<SparqlResults> {
        const data: SparqlResults = JSON.parse(JSON.stringify(this.DUMMY_DATA));
        return this.findScientifiProductionByFiltersCommon(data, filters, pageRequest);
    }


    /**
     *
     *
     * @private
     * @param {SparqlResults} data data to find
     * @param {Map<string, string>} filters data to filter
     * @param {PageRequest} pageRequest page request
     * @return {*}  {Page<SparqlResults>} page results
     * @memberof ScientificProductionService
     */
    private findScientifiProductionByFiltersCommon(data: SparqlResults, filters: Map<string, string>, pageRequest: PageRequest
    ): Page<SparqlResults> {
        const page: Page<SparqlResults> = new Page<SparqlResults>();

        let dataFiltered: Binding[] = data.results.bindings;

        // Filters
        if (!!filters) {
            filters.forEach((valueFilter: string, keyFilter: string) => {
                if (!!valueFilter) {
                    dataFiltered = data.results.bindings = data.results.bindings.filter((binding: Binding) => {
                        for (const keyObject of Object.keys(binding)) {
                            if (
                                keyObject === keyFilter &&
                                binding[keyObject].value === valueFilter
                            ) {
                                return true;
                            }
                        }
                    });
                }
            });
        }

        // Order
        if (!!pageRequest && !!pageRequest.property) {
            page.sort = pageRequest.property;
            page.direction = pageRequest.direction;
            data.results.bindings = data.results.bindings.sort((a, b) => {
                if (pageRequest.direction === Direction.ASC) {
                    return (a[pageRequest.property].value > b[pageRequest.property].value) ? 1 : -1;
                }
                return (a[pageRequest.property].value <= b[pageRequest.property].value) ? 1 : -1;
            });
        }

        const min = ((!!pageRequest.page) ? pageRequest.page - 1 : 0) * pageRequest.size;
        const max = ((!!pageRequest.page) ? pageRequest.page : 1) * pageRequest.size;
        data.results.bindings = data.results.bindings.slice(min, max);
        page.number = pageRequest.page;
        page.numberOfElements = pageRequest.size;
        page.size = pageRequest.size;
        page.totalElements = dataFiltered.length;
        // TODO sort

        page.content = [data];

        return page;
    }


}