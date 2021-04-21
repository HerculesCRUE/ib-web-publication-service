import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { AreasService } from 'src/app/_services/areas.service';
import { DocumentService } from 'src/app/_services/document.service';
import { EventsService } from 'src/app/_services/events.service';
import { GraphicService } from 'src/app/_services/graphic.service';
import { PatentService } from 'src/app/_services/patent.service';
import { ResearchStaffService } from 'src/app/_services/research-staff.service';
import { MockAreaservice } from 'src/app/_services/_testingServices/mockAreas.service';
import { MockDocumentService } from 'src/app/_services/_testingServices/mockDocument.service';
import { MockEventsService } from 'src/app/_services/_testingServices/mockEvents.service';
import { MockGraphicService } from 'src/app/_services/_testingServices/mockGraphic.service';
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
      { provide: PatentService, useClass: MockPatentService },
      { provide: GraphicService, useClass: MockGraphicService },
      { provide: AreasService, useClass: MockAreaservice }]
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
