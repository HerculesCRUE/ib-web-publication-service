import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { ParticipantService } from 'src/app/_services/participant.service';
import { MockParticipantService } from 'src/app/_services/_testingServices/mockParticipant.service';


import { PeopleInvolvedComponent } from './people-involved.component';

describe('PeopleInvolvedComponent', () => {
  let component: PeopleInvolvedComponent;
  let fixture: ComponentFixture<PeopleInvolvedComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [
        { provide: ParticipantService, useClass: MockParticipantService }]
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
