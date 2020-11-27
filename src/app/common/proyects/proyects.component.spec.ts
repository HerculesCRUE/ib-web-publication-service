import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
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
    fakeAsync(() => {
      expect(component).toBeTruthy();
    });
  });
  /*
    it('should create execute ngOnInit and populate data table to show', () => {
      spyOn(projectService, 'findProjectByFilters').and.callThrough();
      spyOn(component, 'ngOnInit').and.callThrough();
      fixture.detectChanges();
      expect(component.allProjectFiltered.content[0].head.vars.length).toBe(6);
      expect(component.allProjectFiltered.content[0].results.bindings.length).not.toBe(0);
    });
  
    describe('should generate data for graphic', () => {
      it('should return all values by filtering by empty filter', () => {
        const result = component.genData(4);
        expect(result.seriesData.length).toBe(4);
      });
    });
  
    describe('on component Init', () => {
      it('should change loadingData to true', () => {
        const pageRequest: PageRequest = new PageRequest();
        pageRequest.page = 1;
        pageRequest.size = 10;
        component.ngOnInit();
        fixture.detectChanges();
        console.log('all', component.allProjectFiltered);
        expect(component.allProjectFiltered.totalElements).toBe(3);
      });
    });
  
    describe('on Chart Init', () => {
      it('should change loadingData to true', () => {
        component.onChartInit();
        expect(component.loadingData).toBeTruthy();
      });
    });
  
    describe('filter Top results', () => {
      it('should filter by type', () => {
        component.findRequest.filter.year = '2020';
        spyOn(projectService, 'findProjectByFilters').and.callThrough();
        expect(component.allProjectFiltered.totalElements).toBe(1);
      });
  
      it('should return all values by filtering by empty filter', () => {
        component.findRequest.filter.year = 'undefined';
        spyOn(projectService, 'findProjectByFilters').and.callThrough();
        expect(component.allProjectFiltered.totalElements).toBe(3);
      });
    });
  
    describe('all proyects Filtered Page Changed', () => {
      it('should change to page 2 and a result to show of 5', () => {
        component.allprojectsFilteredPageChanged(2);
        spyOn(projectService, 'findProjectByFilters').and.callThrough();
        expect(component.allProjectFiltered.number).toBe(2);
        // expect(component.allProjectFiltered.content[0].results.bindings.length).toBe(0);
      });
    });*/
});
