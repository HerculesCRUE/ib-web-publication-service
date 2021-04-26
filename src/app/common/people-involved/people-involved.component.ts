import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Direction, FindRequest, Order, Page, PageRequest, PaginatedSearchComponent } from 'src/app/_helpers/search';
import { Person } from 'src/app/_models/person';
import { ParticipantService } from 'src/app/_services/participant.service';

@Component({
  selector: 'app-people-involved',
  templateUrl: './people-involved.component.html'
})
export class PeopleInvolvedComponent extends PaginatedSearchComponent<Person> implements OnInit {
  @Input() projectId: string;
  loaded: boolean;
  findRequest: FindRequest = new FindRequest();

  constructor(
    router: Router,
    translate: TranslateService,
    toastr: ToastrService,
    private participantService: ParticipantService
  ) {
    super(router, translate, toastr);
  }

  ngOnInit(): void {
  }

  protected findInternal(findRequest: FindRequest): Observable<Page<Person>> {
    const page: Page<Person> = new Page();
    const result = this.participantService.findPeopleInvolvedInProject(findRequest, this.projectId).pipe(
      map((x) => {
        this.loaded = true;
        return x;
      }), // return the received value true/false
      catchError((err) => {
        this.loaded = true;
        return of(page)
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

  allParticipantsFilteredSortChanged(pageRequest: PageRequest) {
    this.findRequest.pageRequest.property = pageRequest.property;
    this.findRequest.pageRequest.direction = pageRequest.direction;
    this.participantService.findPeopleInvolvedInProject(this.findRequest, this.projectId).subscribe((data) => {
      this.resultObject = data;
      this.loaded = true;
    });
  }

  changePeopleInvolvedProyect() {
    this.participantService.findPeopleInvolvedInProject(this.findRequest, this.projectId).subscribe((data) => {
      this.resultObject = data;
      this.loaded = true;
    }, () => {
      this.loaded = true;
    });
  }


}
