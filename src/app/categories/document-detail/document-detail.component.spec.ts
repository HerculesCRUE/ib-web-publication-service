import { Location } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { PageRequest } from 'src/app/_helpers/search';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { DocumentService } from 'src/app/_services/document.service';
import { MockDocumentService } from 'src/app/_services/_testingServices/mockDocument.service';

import { DocumentDetailComponent } from './document-detail.component';

describe('DocumentDetailComponent', () => {
  let component: DocumentDetailComponent;
  let fixture: ComponentFixture<DocumentDetailComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: DocumentService, useClass: MockDocumentService },
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: { params: { id: 123, type: 'http://trellis.com/data/Book' } }
        }
      }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('init component', () => {
    it('should init and verified type on route to be book', () => {
      component.ngOnInit();
      expect(component.lastItem).toBe('Book');
    });

    it('should init and verified type on route to be Dossier', () => {
      const acroute = fixture.debugElement.injector.get(ActivatedRoute);
      acroute.snapshot.params.type = 'http://trellis.com/data/Dossier';

      component.ngOnInit();
      expect(component.lastItem).toBe('Dossier');
    });

    it('should init and verified type on route to be Article', () => {
      const acroute = fixture.debugElement.injector.get(ActivatedRoute);
      acroute.snapshot.params.type = 'http://trellis.com/data/Article';

      component.ngOnInit();
      expect(component.lastItem).toBe('Article');
    });

    it('should init and verified type on route to be other', () => {
      const acroute = fixture.debugElement.injector.get(ActivatedRoute);
      acroute.snapshot.params.type = 'http://trellis.com/data/Other';

      component.ngOnInit();
      expect(component.lastItem).toBe('Other');
    });
  });


  it('should go back', () => {
    const location = fixture.debugElement.injector.get(Location);
    const spy = spyOn(location, 'back').and.callThrough();
    component.backClicked();
    expect(spy).toHaveBeenCalled();
  })

  it('should sort documents from table by id', () => {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.property = 'id';
    component.allDocumentSortChanged(pageRequest);
    expect(component.findRequest.pageRequest.property).toBe('id');
  });

  it('should sort documents from table by id', () => {
    const documentService = fixture.debugElement.injector.get(DocumentService);
    const spy = spyOn(documentService, 'getBookSection').and.returnValue(throwError('error'));
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.property = 'id';
    component.allDocumentSortChanged(pageRequest);
    expect(component.findRequest.pageRequest.property).toBe('id');
    expect(component.loaded).toBeTruthy();
  });




});
