import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FindRequest, PageRequest } from 'src/app/_helpers/search';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { AcademicPublication } from 'src/app/_models/academicPublication';
import { AreasService } from 'src/app/_services/areas.service';
import { DocumentService } from 'src/app/_services/document.service';
import { MockAreaservice } from 'src/app/_services/_testingServices/mockAreas.service';
import { MockDocumentService } from 'src/app/_services/_testingServices/mockDocument.service';

import { DocumentsComponent } from './documents.component';

describe('DocumentsComponent', () => {
  let component: DocumentsComponent;
  let fixture: ComponentFixture<DocumentsComponent>;
  let documentService: MockDocumentService;
  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: DocumentService, useClass: MockDocumentService },
      { provide: AreasService, useClass: MockAreaservice }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsComponent);
    component = fixture.componentInstance;
    documentService = TestBed.inject(MockDocumentService);
    fixture.detectChanges();
  });



  it('should create execute ngOnInit and populate data table to show', () => {
    const docService1 = fixture.debugElement.injector.get(DocumentService);
    const spy = spyOn(docService1, 'find').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.resultObject.content.length).toBe(10);
    expect(component.resultObject.content.length).not.toBe(0);
  });

  describe('on component Init', () => {
    it('should change load all elements', () => {
      const docService1 = fixture.debugElement.injector.get(DocumentService);
      const spy = spyOn(docService1, 'find').and.callThrough();
      const pageRequest: PageRequest = new PageRequest();
      pageRequest.page = 1;
      pageRequest.size = 10;
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.resultObject.totalElements).toBe(10);
    });

    it('should populate authorId filter', () => {
      const docService1 = fixture.debugElement.injector.get(DocumentService);
      const spy = spyOn(docService1, 'find').and.callThrough();
      component.authorId = '1234';
      const pageRequest: PageRequest = new PageRequest();
      pageRequest.page = 1;
      pageRequest.size = 10;
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.findRequest.filter.authorId).toBe('1234');
    });

    it('should populate organization id ', () => {
      const docService1 = fixture.debugElement.injector.get(DocumentService);
      const spy = spyOn(docService1, 'find').and.callThrough();
      component.organizationId = '1234';
      const pageRequest: PageRequest = new PageRequest();
      pageRequest.page = 1;
      pageRequest.size = 10;
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.findRequest.filter.organizationId).toBe('1234');
    });
  });



  describe('test filterProjects', () => {
    it('should change the ini value sent to the back to corrent form', fakeAsync(() => {
      component.dateIni = 1385078400000;
      component.filterProjects();
      tick(300);
      fixture.detectChanges();
      expect(component.findRequest.filter.yearFrom).toBe('2013');
    }));

    it('should change the fin value sent to the back to corrent form', fakeAsync(() => {
      spyOn(documentService, 'find').and.callThrough();
      component.dateFin = 1385078400000;
      component.filterProjects();
      tick(300);
      fixture.detectChanges();
      expect(component.findRequest.filter.yearTo).toBe('2013');
    }));

    it('should cnot return a valiu filter fin parse', fakeAsync(() => {
      spyOn(documentService, 'find').and.callThrough();
      component.dateFin = 138504334344378400000;
      component.filterProjects();
      tick(300);
      fixture.detectChanges();
      expect(component.findRequest.filter.yearTo).toBeUndefined();
    }));


    it('should not return a valid filter ini parse', fakeAsync(() => {
      spyOn(documentService, 'find').and.callThrough();
      component.dateIni = 138504334344378400000;
      component.filterProjects();
      tick(300);
      fixture.detectChanges();
      expect(component.findRequest.filter.start).toBeUndefined();
    }));

    it('should call academic service', fakeAsync(() => {
      component.idPrefix = 'academic';
      const docService1 = fixture.debugElement.injector.get(DocumentService);
      const spy = spyOn(docService1, 'findAcademicPublication').and.callThrough();
      component.dateIni = 138504334344378400000;
      component.filterProjects();
      tick(300);
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    }));

    it('should call other publications service', fakeAsync(() => {
      component.idPrefix = 'other';
      const docService1 = fixture.debugElement.injector.get(DocumentService);
      const spy = spyOn(docService1, 'findOtherPublications').and.callThrough();
      component.dateIni = 138504334344378400000;
      component.filterProjects();
      tick(300);
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    }));

    it('should call other publications service', fakeAsync(() => {
      component.idPrefix = 'other';
      const docService1 = fixture.debugElement.injector.get(DocumentService);
      const spy = spyOn(docService1, 'findOtherPublications').and.callThrough();
      component.dateIni = 138504334344378400000;
      component.findRequest.filter.type = 'Academic';
      component.filterProjects();
      tick(300);
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
      expect(component.findRequest.filter.type).toBe('Academic');
    }));
  });

  describe('filterDocuments', () => {
    it('should filter document data and call service', () => {
      const documentService1 = fixture.debugElement.injector.get(DocumentService);
      const spy = spyOn(documentService1, 'findscientificpublication').and.callThrough();
      component.filterDocuments();
      expect(spy).toHaveBeenCalled();
    });
    it('should filter document data and call adecamic publication service', () => {
      component.idPrefix = 'academic';
      const docService = fixture.debugElement.injector.get(DocumentService);
      const spy = spyOn(docService, 'findAcademicPublication').and.callThrough();
      component.filterDocuments();
      expect(spy).toHaveBeenCalled();
    });
    it('should filter document data and call other publication service', () => {
      component.idPrefix = 'other';
      const docService = fixture.debugElement.injector.get(DocumentService);
      const spy = spyOn(docService, 'findOtherPublications').and.callThrough();
      component.filterDocuments();
      expect(spy).toHaveBeenCalled();
    });

  });

  describe('test allprojectsFilteredSortChanged', () => {
    it('expect to call service function findProjectByFilters', () => {
      const newPageRequest: PageRequest = new PageRequest();
      newPageRequest.page = 0;
      newPageRequest.size = 10;
      component.findRequest.pageRequest = newPageRequest;
      const docService = fixture.debugElement.injector.get(DocumentService);
      const spy = spyOn(docService, 'findscientificpublication').and.callThrough();
      fixture.detectChanges();
      component.allprojectsFilteredSortChanged(component.findRequest.pageRequest);
      expect(spy).toHaveBeenCalledWith(component.findRequest);
    });
    it('should call academic service', fakeAsync(() => {
      component.idPrefix = 'academic';
      const newPageRequest: PageRequest = new PageRequest();
      newPageRequest.page = 0;
      newPageRequest.size = 10;
      component.findRequest.pageRequest = newPageRequest;
      const docService = fixture.debugElement.injector.get(DocumentService);
      const spy = spyOn(docService, 'findAcademicPublication').and.callThrough();
      fixture.detectChanges();
      component.allprojectsFilteredSortChanged(component.findRequest.pageRequest);
      expect(spy).toHaveBeenCalledWith(component.findRequest);
    }));
    it('should call other publications service', fakeAsync(() => {
      component.idPrefix = 'other';
      const newPageRequest: PageRequest = new PageRequest();
      newPageRequest.page = 0;
      newPageRequest.size = 10;
      component.findRequest.pageRequest = newPageRequest;
      const docService = fixture.debugElement.injector.get(DocumentService);
      const spy = spyOn(docService, 'findOtherPublications').and.callThrough();
      fixture.detectChanges();
      component.allprojectsFilteredSortChanged(component.findRequest.pageRequest);
      expect(spy).toHaveBeenCalledWith(component.findRequest);
    }));
  });

  it('findInternal', () => {
    component.authorId = '12345';
    component.organizationId = 'Academic';
    component.find();
    const doc = new AcademicPublication();
    component.remove(doc);
    expect(component.authorId).toBe('12345');
  });


});
