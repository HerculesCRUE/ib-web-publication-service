import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PageRequest } from 'src/app/_helpers/search';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { EventsService } from 'src/app/_services/events.service';
import { MockEventsService } from 'src/app/_services/_testingServices/mockEvents.service';

import { EventsComponent } from './events.component';

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;
  let eventService: MockEventsService;
  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: EventsService, useClass: MockEventsService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    eventService = TestBed.inject(MockEventsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('all events Filtered Page Changed', () => {
    it('should change to page 1 and a result to show of 5', () => {
      component.allEventsFilteredPageChanged(2);
      spyOn(eventService, 'find').and.callThrough();
      expect(component.findRequest.pageRequest.page).toBe(1);
    });
  });

  describe('test allprojectsFilteredSortChanged', () => {
    it('expect to call service function findProjectByFilters', () => {
      const newPageRequest: PageRequest = new PageRequest();
      newPageRequest.page = 0;
      newPageRequest.size = 10;
      component.findRequest.pageRequest = newPageRequest;
      const evnService = fixture.debugElement.injector.get(EventsService);
      const spy = spyOn(evnService, 'find').and.callThrough();
      fixture.detectChanges();
      component.allEventsFilteredSortChanged(component.findRequest.pageRequest);
      expect(spy).toHaveBeenCalledWith(component.findRequest);
    });
  });

  describe('all proyects Filtered Page Changed', () => {
    it('should change to page 1 and a result to show of 5', () => {
      component.allEventsFilteredSizeChanged(20);
      spyOn(eventService, 'find').and.callThrough();
      expect(component.findRequest.pageRequest.size).toBe(20);
    });
  });

  it('filterEvents', () => {
    component.filterEvents();
    expect(component.loaded).toBeTruthy();
  });
});
