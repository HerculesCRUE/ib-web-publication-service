import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from 'src/app/_models/project';
import { FindRequest, Page } from '../../_helpers/search';
import { ProjectService } from '../project.service';


/**
 * 
 * Class used for testing purpose
 */
@Injectable({
    providedIn: 'root',
})
export class MockUniversityService extends ProjectService {
    DATARESULT: any = [{
        id: '2826',
        title: 'EFECTOS DE LA BRIMONIDINA Y LA MEMANTINA EN LA ISQUEMIA RETINIANA',
        abbreviation: '',
        description: '',
        endDate: '2002-12-31',
        foreseenJustificationDate: '',
        keyword: '',
        modality: 'CON',
        needsEthicalValidation: '',
        startDate: '1999-05-11',
        status: ''
    },
    {
        id: '3537',
        title: 'EVALUACION E INTERVENCION PSICOLOGICA INFANTIL Y DE ADULTOS',
        abbreviation: '',
        description: '',
        endDate: '2012-12-31',
        foreseenJustificationDate: '',
        keyword: '',
        modality: 'CON',
        needsEthicalValidation: '',
        startDate: '2000-05-19',
        status: ''
    },
    {
        id: '5059',
        title: 'SEGURIDAD MICROBIOLÓGICA DE ALIMENTOS, EVALUACIÓN NUTRICIONAL Y ANÁLISIS SENSORIAL',
        abbreviation: '',
        description: '',
        endDate: '2500-01-01',
        foreseenJustificationDate: '',
        keyword: '',
        modality: 'GACTIVIDAD',
        needsEthicalValidation: '',
        startDate: '2002-04-01',
        status: ''
    },
    {
        id: '5144',
        title: 'INFORMES PERICIALES',
        abbreviation: '',
        description: '',
        endDate: '2016-12-31',
        foreseenJustificationDate: '',
        keyword: '',
        modality: 'GACTIVIDAD',
        needsEthicalValidation: '',
        startDate: '2002-06-27',
        status: ''
    },
    {
        id: '5396',
        title: 'DISPOSITIVO Y MÉTODO PARA INTRODUCIR YO RECOGER FLUIDOS EN EL INTERIOR DEL ÚTERO DE UN ANIMAL',
        abbreviation: '',
        description: '',
        endDate: '2020-05-06',
        foreseenJustificationDate: '',
        keyword: '',
        modality: 'PATENTES',
        needsEthicalValidation: '',
        startDate: '2002-05-06',
        status: ''
    }];

    /**
     *
     *
     * @param {FindRequest} findRequest
     * @return {*}  {Observable<Page<SparqlResults>>}
     * @memberof MockProjectService
     */
    find(findRequest: FindRequest): Observable<Page<Project>> {
        // Filter params
        const page: Page<Project> = new Page<Project>();
        let results: Project[];
        results = this.DATARESULT;
        page.number = 0;
        page.numberOfElements = 10;
        page.size = 10;
        page.totalElements = 10;
        // TODO sort

        page.content = results;
        return of(page);
    }


}
