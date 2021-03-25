import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PatentDetailComponent } from 'src/app/common/patent-detail/patent-detail.component';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { DocumentService } from 'src/app/_services/document.service';
import { EventsService } from 'src/app/_services/events.service';
import { ResearchStaffService } from 'src/app/_services/research-staff.service';
import { MockDocumentService } from 'src/app/_services/_testingServices/mockDocument.service';
import { MockEventsService } from 'src/app/_services/_testingServices/mockEvents.service';
import { MockPatentService } from 'src/app/_services/_testingServices/mockPatent.service';
import { MockResearchStaffService } from 'src/app/_services/_testingServices/mockResearchStaff.service';

import { ScientistDetailComponent } from './scientist-detail.component';

describe('ScientisDetailComponent', () => {
  let component: ScientistDetailComponent;
  let fixture: ComponentFixture<ScientistDetailComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: ResearchStaffService, useClass: MockResearchStaffService },
      { provide: DocumentService, useClass: MockDocumentService },
      { provide: EventsService, useClass: MockEventsService },
      { provide: PatentDetailComponent, useClass: MockPatentService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScientistDetailComponent);
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
