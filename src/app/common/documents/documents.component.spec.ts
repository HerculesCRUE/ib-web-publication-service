import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PageRequest } from 'src/app/_helpers/search';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { ProjectService } from 'src/app/_services/project.service';
import { MockProjectService } from 'src/app/_services/_testingServices/mockProject.service';

import { DocumentsComponent } from './documents.component';

describe('DocumentsComponent', () => {
  let component: DocumentsComponent;
  let fixture: ComponentFixture<DocumentsComponent>;
  let projectService: MockProjectService;
  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: ProjectService, useClass: MockProjectService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(MockProjectService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create execute ngOnInit and populate data table to show', () => {
    spyOn(projectService, 'findProjectByFilters').and.callThrough();
    spyOn(component, 'ngOnInit').and.callThrough();
    fixture.detectChanges();
    expect(component.allProjectFiltered.content[0].head.vars.length).toBe(6);
    expect(component.allProjectFiltered.content[0].results.bindings.length).not.toBe(0);
  });

  describe('on component Init', () => {
    it('should change load all elements', () => {
      const pageRequest: PageRequest = new PageRequest();
      pageRequest.page = 1;
      pageRequest.size = 10;
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.allProjectFiltered.totalElements).toBe(10);
    });
  });

  describe('all proyects Filtered Page Changed', () => {
    it('should change to page 1 and a result to show of 5', () => {
      component.allprojectsFilteredPageChanged(2);
      spyOn(projectService, 'findProjectByFilters').and.callThrough();
      expect(component.findRequest.pageRequest.page).toBe(1);
    });
  });

  describe('test filterProjects', () => {
    it('should change the ini value sent to the back to corrent form', fakeAsync(() => {
      component.dateIni = 1385078400000;
      component.filterProjects();
      tick(300);
      fixture.detectChanges();
      expect(component.findRequest.filter.ini).toBe('2013-11-22');
    }));

    it('should change the fin value sent to the back to corrent form', fakeAsync(() => {
      component.dateFin = 1385078400000;
      component.filterProjects();
      tick(300);
      fixture.detectChanges();
      expect(component.findRequest.filter.fin).toBe('2013-11-22');
    }));

    it('should cnot return a valiu filter fin parse', fakeAsync(() => {
      component.dateFin = 138504334344378400000;
      component.filterProjects();
      tick(300);
      fixture.detectChanges();
      expect(component.findRequest.filter.fin).toBeUndefined();
    }));


    it('should not return a valid filter ini parse', fakeAsync(() => {
      component.dateIni = 138504334344378400000;
      component.filterProjects();
      tick(300);
      fixture.detectChanges();
      expect(component.findRequest.filter.fin).toBeUndefined();
    }));
  });
});
