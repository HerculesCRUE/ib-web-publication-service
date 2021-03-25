import { Component, Input, OnInit } from '@angular/core';
import { FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';
import { Event } from 'src/app/_models/event';
import { SparqlResults } from 'src/app/_models/sparql';
import { EventsService } from 'src/app/_services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit {
  @Input() idPrefix: string;
  @Input() url: string;
  @Input() participantId: string;
  findRequest: FindRequest = new FindRequest();
  dateIni;
  dateFin;
  allEvents: Page<Event>;
  loaded: boolean;


  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 1;
    pageRequest.size = 10;
    if (this.participantId) {
      this.findRequest.filter.participantId = this.participantId;
    }
    if (this.participantId) {
      this.eventsService.getConferenceByParticipantID(this.findRequest).subscribe(data => {
        this.loaded = true;
        this.allEvents = data;
      });
    } else {
      this.eventsService.find(this.findRequest).subscribe(data => {
        this.loaded = true;
        this.allEvents = data;
      });
    }


  }

  filterEvents() {

    this.loaded = false;
    setTimeout(() => {
      if (this.dateIni) {
        const currentDate = Helper.parse(this.dateIni);
        if (currentDate) {
          this.findRequest.filter.start = currentDate;
        }
      } else {
        this.findRequest.filter.start = null;
      }
      if (this.participantId) {
        this.eventsService.getConferenceByParticipantID(this.findRequest).subscribe(data => {
          this.loaded = true;
          this.allEvents = data;
        });
      } else {
        this.eventsService.find(this.findRequest).subscribe(data => {
          this.loaded = true;
          this.allEvents = data;
        });
      }
    }, 0);
  }

  /**
   *
   *
   * @param {number} i
   * @memberof EventsComponent
   */
  allEventsFilteredPageChanged(i: number) {
    this.loaded = false;
    this.findRequest.pageRequest.page = i - 1;
    this.findRequest.pageRequest.size = this.allEvents.size;
    if (this.participantId) {
      this.eventsService.getConferenceByParticipantID(this.findRequest).subscribe(data => {
        this.loaded = true;
        this.allEvents = data;
      });
    } else {
      this.eventsService.find(this.findRequest).subscribe(data => {
        this.loaded = true;
        this.allEvents = data;
      });
    }
  }


  /**
   *
   *
   * @param {number} i
   * @memberof EventsComponent
   */
  allEventsFilteredSizeChanged(i: number) {
    this.loaded = false;
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = this.allEvents.number;
    pageRequest.size = i;
    pageRequest.direction = this.allEvents.direction;
    this.findRequest.pageRequest = pageRequest;
    if (this.participantId) {
      this.eventsService.getConferenceByParticipantID(this.findRequest).subscribe(data => {
        this.loaded = true;
        this.allEvents = data;
      });
    } else {
      this.eventsService.find(this.findRequest).subscribe(data => {
        this.loaded = true;
        this.allEvents = data;
      });
    }
  }


  /**
   *
   *
   * @param {PageRequest} pageRequest
   * @memberof EventsComponent
   */
  allEventsFilteredSortChanged(pageRequest: PageRequest) {
    this.loaded = false;
    const newPageRequest: PageRequest = new PageRequest();
    newPageRequest.page = this.allEvents.number;
    newPageRequest.size = this.allEvents.size;
    newPageRequest.property = pageRequest.property;
    newPageRequest.direction = pageRequest.direction;
    this.findRequest.pageRequest = pageRequest;
    if (this.participantId) {
      this.eventsService.getConferenceByParticipantID(this.findRequest).subscribe(data => {
        this.loaded = true;
        this.allEvents = data;
      });
    } else {
      this.eventsService.find(this.findRequest).subscribe(data => {
        this.loaded = true;
        this.allEvents = data;
      });
    }
  }

}
