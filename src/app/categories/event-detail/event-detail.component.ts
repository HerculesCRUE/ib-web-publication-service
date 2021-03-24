import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventDetail } from 'src/app/_models/eventDetail';
import { EventsService } from 'src/app/_services/events.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html'
})
export class EventDetailComponent implements OnInit {
  event: EventDetail = new EventDetail();
  lastItem = '';
  loaded: boolean;
  constructor(private eventService: EventsService, private rutaActiva: ActivatedRoute, private _location: Location) { }

  ngOnInit(): void {
    const id = this.rutaActiva.snapshot.params.id;
    const type = this.rutaActiva.snapshot.params.type;
    if (type) {
      const typeFromURL = type.split('/');
      this.lastItem = typeFromURL.pop();
    }

    this.eventService.geteventByIdAndType(id, btoa(this.lastItem)).subscribe(data => {
      if (data) {
        this.event = data;
        this.loaded = true;
      }
    });
  }

  backClicked() {
    this._location.back();
  }


}
