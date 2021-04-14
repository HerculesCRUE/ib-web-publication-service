import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AbstractService } from 'src/app/_helpers/abstract';
import { FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';
import { SparqlResults } from 'src/app/_models/sparql';



/**
 * testing
 *
 * @export
 * @class MockParticipantService
 * @extends {AbstractService}
 */
@Injectable({
    providedIn: 'root',
})
export class MockParticipantService extends AbstractService {
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
    // mock data
    readonly DUMMY_DATA_TOP: SparqlResults = {
        head: {
            vars: [
                'name',
                'area',
                'type',
                'appointments',
                'hIndex',
                'publications'
            ]
        },
        results: {
            bindings: [
                // 1
                {
                    name: {
                        type: 'literal',
                        value: 'Maria Hernandez Reyes Mora'
                    },
                    area: {
                        type: 'literal',
                        value: 'Área de gestión'
                    },
                    type: {
                        type: 'literal',
                        value: 'Docente'
                    },
                    appointments: {
                        type: 'literal',
                        value: '208520'
                    },
                    hIndex: {
                        type: 'literal',
                        value: '0'
                    },
                    publications: {
                        type: 'literal',
                        value: '8'
                    }
                },
                // 1
                {
                    name: {
                        type: 'literal',
                        value: 'Jesualdo Tomás'
                    },
                    area: {
                        type: 'literal',
                        value: 'Área de informatica'
                    },
                    type: {
                        type: 'literal',
                        value: 'Docente'
                    },
                    appointments: {
                        type: 'literal',
                        value: '74'
                    },
                    hIndex: {
                        type: 'literal',
                        value: '1'
                    },
                    publications: {
                        type: 'literal',
                        value: '14'
                    }
                },
                // 1
                {
                    name: {
                        type: 'literal',
                        value: 'Tomás Fernández Breis'
                    },
                    area: {
                        type: 'literal',
                        value: 'Área de informatica'
                    },
                    type: {
                        type: 'literal',
                        value: 'Docente'
                    },
                    appointments: {
                        type: 'literal',
                        value: '74'
                    },
                    hIndex: {
                        type: 'literal',
                        value: '1'
                    },
                    publications: {
                        type: 'literal',
                        value: '14'
                    }
                },
                // 1
                {
                    name: {
                        type: 'literal',
                        value: 'Jesualdo Tomás Breis'
                    },
                    area: {
                        type: 'literal',
                        value: 'Área de informatica'
                    },
                    type: {
                        type: 'literal',
                        value: 'Docente'
                    },
                    appointments: {
                        type: 'literal',
                        value: '74'
                    },
                    hIndex: {
                        type: 'literal',
                        value: '1'
                    },
                    publications: {
                        type: 'literal',
                        value: '14'
                    }
                },
                // 1
                {
                    name: {
                        type: 'literal',
                        value: 'Jesualdo Breis'
                    },
                    area: {
                        type: 'literal',
                        value: 'Área de informatica'
                    },
                    type: {
                        type: 'literal',
                        value: 'Docente'
                    },
                    appointments: {
                        type: 'literal',
                        value: '74'
                    },
                    hIndex: {
                        type: 'literal',
                        value: '1'
                    },
                    publications: {
                        type: 'literal',
                        value: '14'
                    }
                },
                // 1
                {
                    name: {
                        type: 'literal',
                        value: 'Jesualdo Hernesto'
                    },
                    area: {
                        type: 'literal',
                        value: 'Área de informatica'
                    },
                    type: {
                        type: 'literal',
                        value: 'Docente'
                    },
                    appointments: {
                        type: 'literal',
                        value: '74'
                    },
                    hIndex: {
                        type: 'literal',
                        value: '1'
                    },
                    publications: {
                        type: 'literal',
                        value: '14'
                    }
                },
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



    /**
     *
     *
     * @param {FindRequest} findRequest
     * @return {*}  {Observable<Page<SparqlResults>>}
     * @memberof MockParticipantService
     */
    findPerson(findRequest: FindRequest): Observable<Page<SparqlResults>> {
        // Filter params
        const page: Page<SparqlResults> = new Page<SparqlResults>();
        const results: SparqlResults = this.DUMMY_DATA_TOP;
        page.number = 0;
        page.numberOfElements = 10;
        page.size = 10;
        page.totalElements = 10;
        // TODO sort
        page.content = [results];
        return of(page);
    }

    findParticipantsByProject(findRequest: FindRequest): Observable<Page<SparqlResults>> {
        // Filter params
        const page: Page<SparqlResults> = new Page<SparqlResults>();
        const results: SparqlResults = this.DUMMY_DATA_TOP;
        page.number = 0;
        page.numberOfElements = 10;
        page.size = 10;
        page.totalElements = 10;
        // TODO sort
        page.content = [results];
        return of(page);
    }

}
