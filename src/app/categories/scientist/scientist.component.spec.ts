import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { GraphicService } from 'src/app/_services/graphic.service';
import { ResearchStaffService } from 'src/app/_services/research-staff.service';
import { MockGraphicService } from 'src/app/_services/_testingServices/mockGraphic.service';
import { MockResearchStaffService } from 'src/app/_services/_testingServices/mockResearchStaff.service';

import { ScientistComponent } from './scientist.component';

describe('ScientistComponent', () => {
  let component: ScientistComponent;
  let fixture: ComponentFixture<ScientistComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [
        { provide: ResearchStaffService, useClass: MockResearchStaffService },
        { provide: GraphicService, useClass: MockGraphicService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScientistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
