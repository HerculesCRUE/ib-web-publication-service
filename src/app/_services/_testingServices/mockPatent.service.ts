import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FindRequest, Page } from 'src/app/_helpers/search';
import { Patent } from 'src/app/_models/patent';
import { SparqlResults } from 'src/app/_models/sparql';

/**
 *  Service for testiong patent service
 *
 * @export
 * @extends {AbstractService}
 */
@Injectable({
    providedIn: 'root',
})
export class MockPatentService {
    // mock data

    readonly DUMMY_DATA: Patent[] = [
        {
            id: '1',
            title: 'PROGRAMA DE ORDENADOR PARA LA APLICACION DE LA ISO 9000 EN CENTROS DE HEMODONACIÓN',
            dateIssued: '',
            doi: '',
            endDate: '',
            endPage: '',
            keyword: '',
            mode: '',
            startDate: '',
            startPage: '', pageEnd: '', pageStart: ''
        },
        {
            id: '9',
            title: 'P-MMAN PREVENTIVE MAINTENANCE MANAGEMENT PROGRAM V1.0',
            dateIssued: '',
            doi: '',
            endDate: '',
            endPage: '',
            keyword: '',
            mode: '',
            startDate: '',
            startPage: '', pageEnd: '', pageStart: ''
        },
        {
            id: '12',
            title: 'DISPOSITIVO PARA REALIZAR RADIOGRAFIAS PANORAMICAS DE MUÑECA',
            dateIssued: '',
            doi: '',
            endDate: '',
            endPage: '',
            keyword: '',
            mode: '',
            startDate: '1997-05-15',
            startPage: '', pageEnd: '', pageStart: ''
        },
        {
            id: '13',
            title: 'CIRCADIANWARE',
            dateIssued: '',
            doi: '',
            endDate: '',
            endPage: '',
            keyword: '',
            mode: '',
            startDate: '',
            startPage: '', pageEnd: '', pageStart: ''
        },
        {
            id: '39',
            title: 'DISPOSITIVO Y MÉTODO PARA INTRODUCIR YO RECOGER FLUIDOS EN EL INTERIOR DEL ÚTERO DE UN ANIMAL',
            dateIssued: '',
            doi: '',
            endDate: '',
            endPage: '',
            keyword: '',
            mode: '',
            startDate: '',
            startPage: '', pageEnd: '', pageStart: ''
        },
        {
            id: '44',
            title: 'FAOK',
            dateIssued: '',
            doi: '',
            endDate: '',
            endPage: '',
            keyword: '',
            mode: '',
            startDate: '',
            startPage: '', pageEnd: '', pageStart: ''
        },
        {
            id: '45',
            title: 'LOGIC NEGOTIATOR',
            dateIssued: '',
            doi: '',
            endDate: '',
            endPage: '',
            keyword: '',
            mode: '',
            startDate: '',
            startPage: '', pageEnd: '', pageStart: ''
        },
        {
            id: '46',
            title: 'GRACE: GRAPHED CASE ENVIRONMENT',
            dateIssued: '',
            doi: '',
            endDate: '',
            endPage: '',
            keyword: '',
            mode: '',
            startDate: '',
            startPage: '', pageEnd: '', pageStart: ''
        },
        {
            id: '47',
            title: 'ENZIMA CON ACTIVIDAD PEROXIDASA AISLADA DE LA ALCACHOFA (CYNARA SCOLYMUS, L.) PROCEDIMIENTO PARA SU AISLAMIENTO Y PURIFICACION Y APLICACIONES.',
            dateIssued: '',
            doi: '',
            endDate: '',
            endPage: '',
            keyword: '',
            mode: '',
            startDate: '2003-07-15',
            startPage: '', pageEnd: '', pageStart: ''
        },
        {
            id: '48',
            title: 'NIP IMPERFECTION PROCESSOR',
            dateIssued: '',
            doi: '',
            endDate: '',
            endPage: '',
            keyword: '',
            mode: '',
            startDate: '',
            startPage: '', pageEnd: '', pageStart: ''
        }
    ];

    find(findRequest: FindRequest): Observable<Page<Patent>> {
        // Filter params
        const page: Page<Patent> = new Page<Patent>();
        let results: Patent[] = [];
        results = this.DUMMY_DATA;
        page.number = 0;
        page.numberOfElements = 10;
        page.size = 10;
        page.totalElements = 10;
        // TODO sort

        page.content = results;
        return of(page);
    }

    getPatent(id: string) {
        // Filter params
        return of({});
    }




}
