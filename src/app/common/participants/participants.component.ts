import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Direction, FindRequest, Order, Page, PageRequest, PaginatedSearchComponent } from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';
import { Person } from 'src/app/_models/person';
import { SparqlResults } from 'src/app/_models/sparql';
import { ParticipantService } from 'src/app/_services/participant.service';
import { ResearchStaffService } from 'src/app/_services/research-staff.service';

/**
 *
 *
 * @export
 * @class ParticipantsComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html'
})
export class ParticipantsComponent extends PaginatedSearchComponent<Person> {
  /**
   * university Id for search filter in case of necessary
   */
  @Input() universityId: string;

  @Input() projectId: string;
  /**
   *
   *
   * @type {Page<SparqlResults>}
   * @memberof ParticipantsComponent
   */
  allDataParticipants: Page<SparqlResults> = new Page();
  /**
   *
   *
   * @type {Page<SparqlResults>}
   * @memberof ParticipantsComponent
   */
  allDataParticipantsSecondTable: Page<SparqlResults> = new Page();

  /**
   *
   *
   * @type {Page<Person>}
   * @memberof ParticipantsComponent
   */
  allDataPerson: Page<Person> = new Page();
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
  /**
   *
   *
   * @memberof ParticipantsComponent
   */
  yearsForSelect = Helper.getYears();
  loaded2 = false;
  constructor(
    private participantService: ParticipantService,
    private researchStaff: ResearchStaffService,
    router: Router,
    translate: TranslateService,
    toastr: ToastrService
  ) {
    super(router, translate, toastr);
  }


  protected findInternal(findRequest: FindRequest): Observable<Page<Person>> {
    const page: Page<Person> = new Page();
    return this.participantService.findParticipantsByProject(findRequest, this.projectId).pipe(
      map((x) => {
        this.loaded = true;
        return x;
      }), // return the received value true/false
      catchError((err) => {
        this.loaded = true;
        return of(page);
      }));
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
    }, () => {
      this.loaded = true;
    });
  }

  changePersonProyect() {
    this.participantService.findPerson(this.findRequest).subscribe((data) => {
      this.resultObject = data;
      this.loaded = true;
    }, () => {
      this.loaded = true;
    });


  }

}