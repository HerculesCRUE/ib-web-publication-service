import { Location } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Page } from 'src/app/_helpers/search';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { Project } from 'src/app/_models/project';
import { ParticipantService } from 'src/app/_services/participant.service';
import { ProjectService } from 'src/app/_services/project.service';
import { ResearchStaffService } from 'src/app/_services/research-staff.service';
import { MockParticipantService } from 'src/app/_services/_testingServices/mockParticipant.service';
import { MockProjectService } from 'src/app/_services/_testingServices/mockProject.service';
import { MockResearchStaffService } from 'src/app/_services/_testingServices/mockResearchStaff.service';
import { ProjectsDetailComponent } from './projects-detail.component';

describe('ProjectsDetailComponent', () => {
  let component: ProjectsDetailComponent;
  let fixture: ComponentFixture<ProjectsDetailComponent>;
  let projectService: MockProjectService;
  const page: Page<Project> = new Page();
  const DATARESULT: any = [{
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
  page.content = [DATARESULT];
  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: ProjectService, useClass: MockProjectService },
      {
        provide: ActivatedRoute,
        useValue: {
          params: of({ id: '123' })
        }
      }, {
        provide: ParticipantService, useValue: {
          find: () => of(page),
          findPerson: () => of(page),
          findParticipantsByProject: () => of(page),
          findPeopleInvolvedInProject: () => of(page),
        }
      }, { provide: ResearchStaffService, useClass: MockResearchStaffService },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsDetailComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(MockProjectService);
    component.proyect = { id: '123' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ng on init', () => {
    it('should init instance and find project by id if it is set', () => {
      component.ngOnInit();
      expect(component.id).toBe('123');
    });
    it('should init instance and return no value in find', () => {
      const projService = fixture.debugElement.injector.get(ProjectService);
      const spy = spyOn(projService, 'find').and.returnValue(of());
      component.ngOnInit();
      expect(component.id).toBe('123');
    });



    it('expect not to receive an id', () => {
      const activatedReoute = fixture.debugElement.injector.get(ActivatedRoute);
      activatedReoute.params = of({ id: null });
      component.ngOnInit();
      expect(component.id).toBeNull();
    });

    it('should init instance and return no value in find', () => {
      const projService = fixture.debugElement.injector.get(ProjectService);
      const pagenew: Page<Project> = new Page();
      pagenew.number = 0;
      pagenew.numberOfElements = 10;
      pagenew.size = 10;
      pagenew.totalElements = 10;
      pagenew.content = [];
      const spy = spyOn(projService, 'find').and.returnValue(of(pagenew));
      component.ngOnInit();
      expect(component.id).toBe('123');
    });
  });

  it('should change tab selected', () => {
    component.changeTab('scientis');
    expect(component.activeTab).toBe('scientis');
  });

  it('backClicked', () => {
    component.id = '111';
    const locat = fixture.debugElement.injector.get(Location);
    const spy = spyOn(locat, 'back').and.callThrough();
    component.backClicked();
    expect(spy).toHaveBeenCalled();
  });

});
