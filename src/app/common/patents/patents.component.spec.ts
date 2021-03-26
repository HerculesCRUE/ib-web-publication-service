
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PageRequest } from 'src/app/_helpers/search';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { GraphicService } from 'src/app/_services/graphic.service';
import { PatentService } from 'src/app/_services/patent.service';
import { MockGraphicService } from 'src/app/_services/_testingServices/mockGraphic.service';
import { MockPatentService } from 'src/app/_services/_testingServices/mockPatent.service';

import { PatentsComponent } from './patents.component';

describe('PatentsComponent', () => {
  let component: PatentsComponent;
  let fixture: ComponentFixture<PatentsComponent>;
  let patentService: MockPatentService;
  let graphicService: MockGraphicService;
  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: PatentService, useClass: MockPatentService },
      { provide: GraphicService, useClass: MockGraphicService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatentsComponent);
    component = fixture.componentInstance;
    patentService = TestBed.inject(MockPatentService);
    graphicService = TestBed.inject(MockGraphicService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('test filterProjects', () => {
    it('expect to call service function findProjectByFilters', fakeAsync(() => {
      const patentService1 = fixture.debugElement.injector.get(PatentService);
      const spy = spyOn(patentService1, 'find').and.callThrough();
      fixture.detectChanges(); // update variables in fixture
      component.filterPatents();
      tick(300);
      expect(spy).toHaveBeenCalled();
    }));
    it('expect to call service function findProjectByFilters with dateIni', fakeAsync(() => {
      component.dateIni = 1385078400000;
      const patentService1 = fixture.debugElement.injector.get(PatentService);
      const spy = spyOn(patentService1, 'find').and.callThrough();
      fixture.detectChanges(); // update variables in fixture
      component.filterPatents();
      tick(300);
      expect(component.findRequest.filter.ini).toBe('2013-11-22');
    }));

    it('expect to call service function findProjectByFilters with dateFin', fakeAsync(() => {
      component.dateFin = 1385078400000;
      const patentService1 = fixture.debugElement.injector.get(PatentService);
      const spy = spyOn(patentService1, 'find').and.callThrough();
      fixture.detectChanges(); // update variables in fixture
      component.filterPatents();
      tick(300);
      expect(component.findRequest.filter.end).toBe('2013-11-22');
    }));

    it('expect to call service function findProjectByFilters with dateIni wrong', fakeAsync(() => {
      component.dateIni = 'sss';
      const patentService1 = fixture.debugElement.injector.get(PatentService);
      const spy = spyOn(patentService1, 'find').and.callThrough();
      fixture.detectChanges(); // update variables in fixture
      component.filterPatents();
      tick(300);
      expect(component.findRequest.filter.ini).toBeUndefined();
    }));

    it('expect to call service function findProjectByFilters with dateFin wrong', fakeAsync(() => {
      component.dateFin = 'sss';
      const patentService1 = fixture.debugElement.injector.get(PatentService);
      const spy = spyOn(patentService1, 'find').and.callThrough();
      fixture.detectChanges(); // update variables in fixture
      component.filterPatents();
      tick(300);
      expect(component.findRequest.filter.end).toBeUndefined();
    }));
  });


  describe('test allPatentsFilteredSortChanged', () => {
    it('expect to call service function findProjectByFilters', () => {
      const newPageRequest: PageRequest = new PageRequest();
      newPageRequest.page = 0;
      newPageRequest.size = 10;
      component.findRequest.pageRequest = newPageRequest;
      const patentService1 = fixture.debugElement.injector.get(PatentService);
      const spy = spyOn(patentService1, 'find').and.callThrough();
      fixture.detectChanges(); // update variables in fixture
      component.allPatentsFilteredSortChanged(component.findRequest.pageRequest);
      expect(spy).toHaveBeenCalledWith(component.findRequest);
    });
  });

  describe('on Chart Init', () => {
    it('should change loadingData to true', () => {
      component.onChartInit();
      expect(component.loadingData).toBeTruthy();
    });
  });

});
