import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Direction, FindRequest, Order, Page, PageRequest, PaginatedSearchComponent } from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';
import { Person } from 'src/app/_models/person';
import { SparqlResults } from 'src/app/_models/sparql';
import { ParticipantService } from 'src/app/_services/participant.service';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.css']
})
export class CollaboratorsComponent extends PaginatedSearchComponent<Person> implements OnInit {

  /**
   *
   *
   * @type {FindRequest}
   * @memberof ParticipantsComponent
   */
  findRequest: FindRequest = new FindRequest();
  /**
   *
   *
   * @memberof ParticipantsComponent
   */
  loaded = false;

  constructor(
    private participantService: ParticipantService,
    router: Router,
    translate: TranslateService,
    toastr: ToastrService
  ) {
    super(router, translate, toastr);
  }


  ngOnInit(): void {
  }


  protected findInternal(findRequest: FindRequest): Observable<Page<Person>> {
    const result = this.participantService.findPerson(findRequest);
    this.loaded = true;
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
    this.participantService.findPerson(this.findRequest).subscribe((data) => {
      this.resultObject = data;
      this.loaded = true;
    });
  }

  changePersonProyect() {
    this.participantService.findPerson(this.findRequest).subscribe((data) => {
      this.resultObject = data;
      this.loaded = true;
    });


  }

}