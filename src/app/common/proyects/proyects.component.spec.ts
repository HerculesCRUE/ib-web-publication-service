import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { MockProjectService } from 'src/app/_services/_testingServices/mockProject.service';
import { ProjectService } from 'src/app/_services/project.service';

import { ProyectsComponent } from './proyects.component';
import { FindRequest, PageRequest } from 'src/app/_helpers/search';

describe('ProyectsComponent', () => {
  let component: ProyectsComponent;
  let fixture: ComponentFixture<ProyectsComponent>;
  let projectService: MockProjectService;
  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: ProjectService, useClass: MockProjectService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectsComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(MockProjectService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create execute ngOnInit and populate data table to show', () => {
    spyOn(projectService, 'find').and.callThrough();
    spyOn(component, 'ngOnInit').and.callThrough();
    fixture.detectChanges();
    expect(component.allProjectFiltered.content.length).toBe(5);
    expect(component.allProjectFiltered.content.length).not.toBe(0);
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

  describe('on component Init', () => {
    it('should change load all elements and start bar graphic', () => {
      const pageRequest: PageRequest = new PageRequest();
      pageRequest.page = 1;
      pageRequest.size = 10;
      component.chartType = 'bar';
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.echartOptions.legend.align).toBe('left');
    });
  });

  describe('on Chart Init', () => {
    it('should change loadingData to true', () => {
      component.onChartInit();
      expect(component.loadingData).toBeTruthy();
    });
  });

  describe('all proyects Filtered Page Changed', () => {
    it('should change to page 1 and a result to show of 5', () => {
      component.allprojectsFilteredPageChanged(2);
      spyOn(projectService, 'find').and.callThrough();
      expect(component.findRequest.pageRequest.page).toBe(1);
    });
  });

  describe('test filterProjects', () => {
    it('should change the ini value sent to the back to corrent form', fakeAsync(() => {
      component.dateIni = 1385078400000;
      component.filterProjects();
      tick(300);
      fixture.detectChanges();
      expect(component.findRequest.filter.start).toBe('2013-11-22');
    }));

    it('should change the fin value sent to the back to corrent form', fakeAsync(() => {
      component.dateFin = 1385078400000;
      component.filterProjects();
      tick(300);
      fixture.detectChanges();
      expect(component.findRequest.filter.end).toBe('2013-11-22');
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

  describe('all proyects Filtered Page Changed', () => {
    it('should change to page 1 and a result to show of 5', () => {
      component.allprojectsFilteredSizeChanged(20);
      spyOn(projectService, 'find').and.callThrough();
      expect(component.findRequest.pageRequest.size).toBe(20);
    });
  });

  describe('test allprojectsFilteredSortChanged', () => {
    it('expect to call service function findProjectByFilters', () => {
      const newPageRequest: PageRequest = new PageRequest();
      newPageRequest.page = 0;
      newPageRequest.size = 10;
      component.findRequest.pageRequest = newPageRequest;
      const projService = fixture.debugElement.injector.get(ProjectService);
      const spy = spyOn(projService, 'find').and.callThrough();
      fixture.detectChanges();
      component.allprojectsFilteredSortChanged(component.findRequest.pageRequest);
      expect(spy).toHaveBeenCalledWith(component.findRequest);
    });
  });
});
