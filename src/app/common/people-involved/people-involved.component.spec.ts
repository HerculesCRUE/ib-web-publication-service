import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { ResearchStaffService } from 'src/app/_services/research-staff.service';
import { MockResearchStaffService } from 'src/app/_services/_testingServices/mockResearchStaff.service';

import { PeopleInvolvedComponent } from './people-involved.component';

describe('PeopleInvolvedComponent', () => {
  let component: PeopleInvolvedComponent;
  let fixture: ComponentFixture<PeopleInvolvedComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [
        { provide: ResearchStaffService, useClass: MockResearchStaffService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleInvolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
