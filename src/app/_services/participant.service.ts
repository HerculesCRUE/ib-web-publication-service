import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AbstractService } from '../_helpers/abstract';
import { FindRequest, Page, PageRequest } from '../_helpers/search';
import { Helper } from '../_helpers/utils';
import { Person } from '../_models/person';
import { SparqlResults } from '../_models/sparql';


/**
 *
 *
 * @export
 * @class ParticipantService
 * @extends {AbstractService}
 */
@Injectable({
    providedIn: 'root',
})
export class ParticipantService extends AbstractService {
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
     * Creates an instance of ParticipantService.
     * @memberof ParticipantService
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
     * @memberof ParticipantService
     */
    find(filters: Map<string, string>, pageRequest: PageRequest): Page<SparqlResults> {
        const data: SparqlResults = JSON.parse(JSON.stringify(this.DUMMY_DATA));
        return Helper.findInServiceData(data, filters, pageRequest);
    }


    findPerson(findRequest: FindRequest): Observable<Page<Person>> {
        // Filter params
        let parameters = new HttpParams();
        parameters = Helper.addParam(parameters, 'tipo', findRequest.filter.type);
        parameters = Helper.addParam(parameters, 'name', findRequest.filter.name);
        // Pagination params
        parameters = Helper.addPaginationParams(parameters, findRequest.pageRequest);

        return this.httpClient
            .get(Helper.getUrl('/person/search'), {
                params: parameters
            }).pipe(
                catchError(this.handleError)
            );
    }

}
