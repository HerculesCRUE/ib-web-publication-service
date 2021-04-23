import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Direction, FindRequest, Order, Page, PageRequest, PaginatedSearchComponent } from 'src/app/_helpers/search';
import { Person } from 'src/app/_models/person';
import { ParticipantService } from 'src/app/_services/participant.service';

/**
 *
 *
 * @export
 * @class CollaboratorsComponent
 * @extends {PaginatedSearchComponent<Person>}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html'
})
export class CollaboratorsComponent extends PaginatedSearchComponent<Person> implements OnInit {

  /**
   *
   *
   * @type {FindRequest}
   * @memberof CollaboratorsComponent
   */
  findRequest: FindRequest = new FindRequest();
  /**
   *
   *
   * @memberof CollaboratorsComponent
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


  /**
   *
   *
   * @protected
   * @param {FindRequest} findRequest
   * @return {*}  {Observable<Page<Person>>}
   * @memberof CollaboratorsComponent
   */
  protected findInternal(findRequest: FindRequest): Observable<Page<Person>> {
    const page: Page<Person> = new Page();
    const result = this.participantService.findPerson(findRequest).pipe(
      map((x) => {
        this.loaded = true;
        return x;
      }),
      catchError((err) => {
        this.loaded = true;
        return of(page)
      }));
    return result;
  }

  /**
   *
   *
   * @protected
   * @param {*} entity
   * @return {*}  {Observable<any>}
   * @memberof CollaboratorsComponent
   */
  protected removeInternal(entity: any): Observable<any> {
    return of({});
  }

  /**
   *
   *
   * @protected
   * @return {*}  {Order}
   * @memberof CollaboratorsComponent
   */
  protected getDefaultOrder(): Order {
    return {
      property: 'id',
      direction: Direction.ASC
    };
  }

  allCollabortorsFilteredSortChanged(pageRequest: PageRequest) {
    this.findRequest.pageRequest.property = pageRequest.property;
    this.findRequest.pageRequest.direction = pageRequest.direction;
    this.participantService.findPerson(this.findRequest).subscribe((data) => {
      this.resultObject = data;
      this.loaded = true;
    }, () => {
      this.loaded = true;
    });
  }

  changeCollaborator() {
    this.participantService.findPerson(this.findRequest).subscribe((data) => {
      this.resultObject = data;
      this.loaded = true;
    }, () => {
      this.loaded = true;
    });


  }

}