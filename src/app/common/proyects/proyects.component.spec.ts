import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { MockProjectService } from 'src/app/_services/_testingServices/mockProject.service';
import { ProjectService } from 'src/app/_services/project.service';

import { ProyectsComponent } from './proyects.component';
import { FindRequest, PageRequest } from 'src/app/_helpers/search';
import { GraphicService } from 'src/app/_services/graphic.service';
import { MockGraphicService } from 'src/app/_services/_testingServices/mockGraphic.service';
import { Observable, of } from 'rxjs';

describe('ProyectsComponent', () => {
  let component: ProyectsComponent;
  let fixture: ComponentFixture<ProyectsComponent>;
  let projectService: MockProjectService;
  let graphicService: MockGraphicService;
  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: ProjectService, useClass: MockProjectService },
      { provide: GraphicService, useClass: MockGraphicService }]
    }).compileComponents();
  }));



  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectsComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(MockProjectService);
    graphicService = TestBed.inject(MockGraphicService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* it('should create execute ngOnInit and populate data table to show', () => {
     spyOn(projectService, 'find').and.callThrough();
     spyOn(graphicService, 'projectInvestigation').and.returnValue(of({}));
     spyOn(component, 'ngOnInit').and.callThrough();
     fixture.detectChanges();
     expect(component.resultObject.content.length).toBe(5);
     expect(component.resultObject.content.length).not.toBe(0);
   });
 */
  describe('on component Init', () => {
    it('should change load all elements', () => {
      const graphicService1 = fixture.debugElement.injector.get(GraphicService);
      const spy = spyOn(graphicService1, 'projectInvestigation').and.callThrough();
      const pageRequest: PageRequest = new PageRequest();
      pageRequest.page = 1;
      pageRequest.size = 10;
      component.ngOnInit();
      expect(component.resultObject.totalElements).toBe(10);
    });
  });

  describe('on component Init', () => {
    it('should change load all elements and start bar graphic', () => {
      const graphicService1 = fixture.debugElement.injector.get(GraphicService);
      const spy = spyOn(graphicService1, 'projectInvestigation').and.callThrough();
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
