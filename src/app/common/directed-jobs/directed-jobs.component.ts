import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Direction, FindRequest, Order, Page, PageRequest, PaginatedSearchComponent } from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';
import { AcademicPublication } from 'src/app/_models/academicPublication';
import { DocumentService } from 'src/app/_services/document.service';


/**
 *
 *
 * @export
 * @class DirectedJobsComponent
 * @extends {PaginatedSearchComponent<AcademicPublication>}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-directed-jobs',
  templateUrl: './directed-jobs.component.html'
})
export class DirectedJobsComponent extends PaginatedSearchComponent<AcademicPublication> implements OnInit {


  /**
   *
   *
   * @type {string}
   * @memberof DirectedJobsComponent
   */
  @Input() idPrefix: string;
  /**
   *
   *
   * @type {string}
   * @memberof DirectedJobsComponent
   */
  @Input() scientificId: string;
  /**
   *
   *
   * @type {FindRequest}
   * @memberof DirectedJobsComponent
   */
  findRequest: FindRequest = new FindRequest();
  /**
   *
   *
   * @memberof DirectedJobsComponent
   */
  loaded = false;
  /**
   *
   *
   * @memberof DirectedJobsComponent
   */
  dateIni;
  /**
   *
   *
   * @memberof DirectedJobsComponent
   */
  yearsForSelect = Helper.getYears();
  /**
   *
   *
   * @type {Map<string, string>}
   * @memberof DirectedJobsComponent
   */
  filters: Map<string, string> = new Map();

  constructor(private documentService: DocumentService,
    router: Router,
    translate: TranslateService,
    toastr: ToastrService
  ) {
    super(router, translate, toastr);
  }

  ngOnInit(): void {
    if (this.scientificId) {
      this.findRequest.filter.authorId = this.scientificId;
    }
  }


  /**
   *
   *
   * @protected
   * @param {FindRequest} findRequest
   * @return {*}  {Observable<Page<AcademicPublication>>}
   * @memberof DirectedJobsComponent
   */
  protected findInternal(findRequest: FindRequest): Observable<Page<AcademicPublication>> {
    if (this.scientificId) {
      this.findRequest.filter.authorId = this.scientificId;
    }
    const page: Page<AcademicPublication> = new Page();
    const result = this.documentService.findAcademicPublication(findRequest).pipe(
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

  /**
   *
   *
   * @protected
   * @param {*} entity
   * @return {*}  {Observable<any>}
   * @memberof DirectedJobsComponent
   */
  protected removeInternal(entity: any): Observable<any> {
    return of({});
  }

  /**
   *
   *
   * @protected
   * @return {*}  {Order}
   * @memberof DirectedJobsComponent
   */
  protected getDefaultOrder(): Order {
    return {
      property: 'id',
      direction: Direction.ASC
    };
  }

  /**
   *
   *
   * @memberof DirectedJobsComponent
   */
  filteDirectedJobs() {
    this.findRequest.pageRequest.page = 0;
    setTimeout(() => {
      if (this.dateIni) {
        const currentDate = Helper.parse(this.dateIni);
        if (currentDate) {
          this.findRequest.filter.date = currentDate;
        }
      } else {
        this.findRequest.filter.date = null;
      }
      this.documentService.findAcademicPublication(this.findRequest).subscribe(data => {
        this.resultObject = data;
        this.loaded = true;
      }, () => {
        this.loaded = true;
      });
    }, 0);
    this.loaded = true;
  }


  allDirectedFilteredSortChanged(pageRequest: PageRequest) {
    this.findRequest.pageRequest.property = pageRequest.property;
    this.findRequest.pageRequest.direction = pageRequest.direction;
    this.documentService.findAcademicPublication(this.findRequest).subscribe(data => {
      this.resultObject = data;
      this.loaded = true;
    }, () => {
      this.loaded = true;
    });
  }
}
