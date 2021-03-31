import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FindRequest, Page } from 'src/app/_helpers/search';
import { AcademicPublication } from 'src/app/_models/academicPublication';
import { Document } from 'src/app/_models/document';


@Injectable({
    providedIn: 'root',
})
export class MockDocumentService {
    // mock data

    readonly DUMMY_DATA: Document[] = [
        {
            id: '0-213-8646',
            title: 'DIDACTICA DE LA LENGUA Y LA LITERATURA',
            date: '1993',
            doi: '',
            endPage: '',
            publishedIn: '',
            startPage: '',
            type: null
        },
        {
            id: '0-333-75765-3',
            title: 'INSIDE OUT UPPER INTERMEDIATE',
            date: '2001',
            doi: '',
            endPage: '',
            publishedIn: '',
            startPage: '',
            type: null
        },
        {
            id: '00-0000-000-0',
            title: 'Report of the Workshop on Benthos related Environmental Metrics WKBEMET',
            date: '2008',
            doi: '',
            endPage: '',
            publishedIn: '',
            startPage: '',
            type: null
        },
        {
            id: '0211-8149',
            title: 'LA POESÍA NEGRA DE EXPRESIÓN FRANCESA',
            date: '1997',
            doi: '',
            endPage: '',
            publishedIn: '',
            startPage: '',
            type: null
        },
        {
            id: '1',
            title: 'MATERIALITIES OF SCOOLING DESIGNTECHNOLOGYOBJECTSROUTINES',
            date: '2005',
            doi: '',
            endPage: '',
            publishedIn: '',
            startPage: '',
            type: null
        },
        {
            id: '102-418-98',
            title: 'APUNTES DE FILTROS DIGITALES IIR',
            date: '1997',
            doi: '',
            endPage: '',
            publishedIn: '',
            startPage: '',
            type: null
        },
        {
            id: '1130-0507',
            title: 'ASPECTOS DE LA FILOSOFIA DE LUDWIG WITTGENSTEIN',
            date: '1990',
            doi: '',
            endPage: '',
            publishedIn: '',
            startPage: '',
            type: null
        },
        {
            id: '1130-8451-92',
            title: 'FECUNDACION IN VITRO EN LA ESPECIE PORCINA',
            date: '1992',
            doi: '',
            endPage: '',
            publishedIn: '',
            startPage: '',
            type: null
        },
        {
            id: '11922013',
            title: 'Transtorno del Espectro autista Salud oral en nimños con riesgo vulnerabilidad social en guatemala',
            date: '2013',
            doi: '',
            endPage: '',
            publishedIn: '',
            startPage: '',
            type: null
        },
        {
            id: '2-88164-003-6',
            title: 'BIOCHEMICAL MOLECULAR AND PHYSIOLOGICAL ASPETS OF PLANT',
            date: '1991',
            doi: '',
            endPage: '',
            publishedIn: '',
            startPage: '',
            type: null
        }
    ];
    /**
     *
     *
     * @param {FindRequest} findRequest
     * @return {*}  {Observable<Page<Document>>}
     * @memberof MockDocumentService
     */
    find(findRequest: FindRequest): Observable<Page<Document>> {
        // Filter params
        const page: Page<Document> = new Page<Document>();
        const results: Document[] = this.DUMMY_DATA;
        page.number = 0;
        page.numberOfElements = 10;
        page.size = 10;
        page.totalElements = 10;
        // TODO sort
        page.content = results;
        return of(page);
    }

    /**
     *
     *
     * @param {FindRequest} findRequest
     * @return {*}  {Observable<Page<AcademicPublication>>}
     * @memberof MockDocumentService
     */
    findAcademicPublication(findRequest: FindRequest): Observable<Page<AcademicPublication>> {
        // Filter params
        const page: Page<AcademicPublication> = new Page<AcademicPublication>();
        const results: AcademicPublication[] = [];
        page.number = 0;
        page.numberOfElements = 10;
        page.size = 10;
        page.totalElements = 10;
        // TODO sort
        page.content = results;
        return of(page);
    }

    /**
     *
     *
     * @param {*} id
     * @param {*} type
     * @return {*} 
     * @memberof MockDocumentService
     */
    getDocumentByIdAndType(id, type) {
        return of({});
    }

    /**
     *
     *
     * @param {FindRequest} findRequest
     * @return {*}  {Observable<Page<Document>>}
     * @memberof MockDocumentService
     */
    getBookSection(findRequest: FindRequest): Observable<Page<Document>> {
        // Filter params
        const page: Page<Document> = new Page<Document>();
        const results: Document[] = this.DUMMY_DATA;
        page.number = 0;
        page.numberOfElements = 10;
        page.size = 10;
        page.totalElements = 10;
        // TODO sort
        page.content = results;
        return of(page);
    }




}
