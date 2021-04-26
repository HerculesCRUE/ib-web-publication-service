import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Direction, FindRequest, Order, Page, PageRequest, PaginatedSearchComponent } from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';
import { Event } from 'src/app/_models/event';
import { EventsService } from 'src/app/_services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html'
})
export class EventsComponent extends PaginatedSearchComponent<Event> implements OnInit {
  @Input() idPrefix: string;
  @Input() url: string;
  @Input() participantId: string;
  @Input() types: string;
  findRequest: FindRequest = new FindRequest();
  dateIni;
  dateFin;
  loaded: boolean;


  constructor(private eventsService: EventsService,
    router: Router,
    translate: TranslateService,
    toastr: ToastrService
  ) {
    super(router, translate, toastr);
  }

  ngOnInit(): void {


    if (this.types === 'Conference') {
      this.findRequest.filter.type = 'Conference';
    }
    if (this.participantId) {
      this.findRequest.filter.participantId = this.participantId;
    }

  }

  protected findInternal(findRequest: FindRequest): Observable<Page<Event>> {
    if (this.types === 'Conference') {
      this.findRequest.filter.type = 'Conference';
    }
    if (this.participantId) {
      this.findRequest.filter.participantId = this.participantId;
    }
    const page: Page<Event> = new Page();
    const result = this.eventsService.find(findRequest).pipe(
      map((x) => {
        this.loaded = true;
        return x;
      }), // return the received value true/false
      catchError((err) => {
        this.loaded = true;
        return of(page);
      }));
    return result;
  }

  protected removeInternal(entity: any): Observable<any> {
    return of({});
  }

  protected getDefaultOrder(): Order {
    return {
      property: 'id',
      direction: Direction.ASC
    };
  }

  filterEvents() {
    this.findRequest.pageRequest.page = 0;
    setTimeout(() => {
      if (this.dateIni) {
        const currentDate = Helper.parse(this.dateIni);
        if (currentDate) {
          this.findRequest.filter.start = currentDate;
        }
      } else {
        this.findRequest.filter.start = null;
      }
      this.eventsService.find(this.findRequest).subscribe((data) => {
        this.resultObject = data;
        this.loaded = true;
      }, () => {
        this.loaded = true;
      });
    }, 0);
  }




  /**
   *
   *
   * @param {PageRequest} pageRequest
   * @memberof EventsComponent
   */
  allEventsFilteredSortChanged(pageRequest: PageRequest) {
    this.findRequest.pageRequest.property = pageRequest.property;
    this.findRequest.pageRequest.direction = pageRequest.direction;
    this.eventsService.find(this.findRequest).subscribe((data) => {
      this.resultObject = data;
      this.loaded = true;
    }, () => {
      this.loaded = true;
    });
  }

}
