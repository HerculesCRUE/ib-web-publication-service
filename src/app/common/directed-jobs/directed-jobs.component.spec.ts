import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PageRequest } from 'src/app/_helpers/search';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { DirectedJobsService } from 'src/app/_services/directedJobs.service';
import { MockDirectedJobsService } from 'src/app/_services/_testingServices/mockDirectedJobs.service';

import { DirectedJobsComponent } from './directed-jobs.component';

describe('DirectedJobsComponent', () => {
  let component: DirectedJobsComponent;
  let fixture: ComponentFixture<DirectedJobsComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: DirectedJobsService, useClass: MockDirectedJobsService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filteDirectedJobs', () => {
    component.filteDirectedJobs();
    expect(component.loaded).toBeTruthy();
  });

  it('should allDirectedFilteredPageChanged', () => {
    component.allDirectedFilteredPageChanged(1);
    expect(component.loaded).toBeTruthy();
  });
  it('should allDirectedFilteredSizeChanged', () => {
    component.allDirectedFilteredSizeChanged(1);
    expect(component.loaded).toBeTruthy();
  });

  it('should allDirectedFilteredSortChanged', () => {
    const page: PageRequest = new PageRequest();
    component.allDirectedFilteredSortChanged(page);
    expect(component.loaded).toBeTruthy();
  });
});