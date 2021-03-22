import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { PatentService } from 'src/app/_services/patent.service';
import { MockPatentService } from 'src/app/_services/_testingServices/mockPatent.service';

import { PatentDetailComponent } from './patent-detail.component';

describe('PatentDetailComponent', () => {
  let component: PatentDetailComponent;
  let fixture: ComponentFixture<PatentDetailComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: PatentService, useClass: MockPatentService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
