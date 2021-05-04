import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FindRequest, Page } from 'src/app/_helpers/search';
import { SparqlResults } from 'src/app/_models/sparql';
import { PatentService } from '../patent.service';


/**
 *
 * Testing service
 * @export
 * @class MockInvestigationGroupService
 * @extends {PatentService}
 */
@Injectable({
    providedIn: 'root',
})
export class MockInvestigationGroupService extends PatentService {
    // mock data
    readonly DUMMY_DATA: SparqlResults = {
        head: {
            vars: [
                'fin',
                'id',
                'ini',
                'name',
                'tipo'
            ]
        },
        results: {
            bindings: [
                {
                    fin: {
                        type: 'literal',
                        value: ''
                    },
                    id: {
                        type: 'literal',
                        value: '12'
                    },
                    ini: {
                        type: 'literal',
                        value: ''
                    },
                    name: {
                        type: 'literal',
                        value: 'PROGRAMA DE ORDENADOR PARA LA APLICACION DE LA ISO 9000 EN CENTROS DE HEMODONACIÓN 2'
                    },
                    tipo: {
                        type: 'literal',
                        value: 'C'
                    }
                },
                {
                    fin: {
                        type: 'literal',
                        value: ''
                    },
                    id: {
                        type: 'literal',
                        value: '123'
                    },
                    ini: {
                        type: 'literal',
                        value: '15-05-1997'
                    },
                    name: {
                        type: 'literal',
                        value: 'DISPOSITIVO PARA REALIZAR RADIOGRAFIAS PANORAMICAS DE MUÑECA 2'
                    },
                    tipo: {
                        type: 'literal',
                        value: 'P'
                    }
                },
                {
                    fin: {
                        type: 'literal',
                        value: ''
                    },
                    id: {
                        type: 'literal',
                        value: '132'
                    },
                    ini: {
                        type: 'literal',
                        value: ''
                    },
                    name: {
                        type: 'literal',
                        value: 'CIRCADIANWARE'
                    },
                    tipo: {
                        type: 'literal',
                        value: 'D'
                    }
                },
                {
                    fin: {
                        type: 'literal',
                        value: ''
                    },
                    id: {
                        type: 'literal',
                        value: '48'
                    },
                    ini: {
                        type: 'literal',
                        value: ''
                    },
                    name: {
                        type: 'literal',
                        value: 'NIP IMPERFECTION PROCESSOR'
                    },
                    tipo: {
                        type: 'literal',
                        value: 'D'
                    }
                },
                {
                    fin: {
                        type: 'literal',
                        value: ''
                    },
                    id: {
                        type: 'literal',
                        value: '49'
                    },
                    ini: {
                        type: 'literal',
                        value: ''
                    },
                    name: {
                        type: 'literal',
                        value: 'PARKINSON-SNM'
                    },
                    tipo: {
                        type: 'literal',
                        value: 'D'
                    }
                }
            ]
        }
    };

    find(findRequest: FindRequest): Observable<Page<SparqlResults>> {
        // Filter params
        const page: Page<SparqlResults> = new Page<SparqlResults>();
        let results: SparqlResults = new SparqlResults();
        results = this.DUMMY_DATA;
        page.number = 0;
        page.numberOfElements = 10;
        page.size = 10;
        page.totalElements = 10;

        page.content = [results];
        return of(page);
    }
}
