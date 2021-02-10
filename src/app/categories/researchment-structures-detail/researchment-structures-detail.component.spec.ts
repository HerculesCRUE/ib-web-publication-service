import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { DocumentService } from 'src/app/_services/document.service';
import { PatentService } from 'src/app/_services/patent.service';
import { ProjectService } from 'src/app/_services/project.service';
import { MockDocumentService } from 'src/app/_services/_testingServices/mockDocument.service';
import { MockPatentService } from 'src/app/_services/_testingServices/mockPatent.service';
import { MockProjectService } from 'src/app/_services/_testingServices/mockProject.service';

import { ResearchmentStructuresDetailComponent } from './researchment-structures-detail.component';

describe('ResearchmentStructuresDetailComponent', () => {
  let component: ResearchmentStructuresDetailComponent;
  let fixture: ComponentFixture<ResearchmentStructuresDetailComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: DocumentService, useClass: MockDocumentService },
      { provide: ProjectService, useClass: MockProjectService },
      { provide: PatentService, useClass: MockPatentService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchmentStructuresDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change tab selected', () => {
    component.changeTab('scientis');
    expect(component.activeTab).toBe('scientis');
  });
});
