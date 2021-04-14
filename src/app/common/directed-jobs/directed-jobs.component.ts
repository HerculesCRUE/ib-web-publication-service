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
   * @type {FindRequest}
   * @memberof DirectedJobsComponent
   */
  findRequest: FindRequest = new FindRequest();
  @Input() idPrefix: string;
  @Input() scientificId: string;
  /**
   *
   *
   * @memberof DirectedJobsComponent
   */
  loaded = false;
  dateIni;

  /**
   *
   *
   * @memberof DirectedJobsComponent
   */
  yearsForSelect = Helper.getYears();
  filters: Map<string, string> = new Map();

  constructor(private documentService: DocumentService,
    router: Router,
    translate: TranslateService,
    toastr: ToastrService
  ) {
    super(router, translate, toastr);
  }

  ngOnInit(): void {
  }


  protected findInternal(findRequest: FindRequest): Observable<Page<AcademicPublication>> {
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

  protected removeInternal(entity: any): Observable<any> {
    return of({});
  }

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

  /**
   *
   *
   * @param {PageRequest} pageRequest
   * @memberof DirectedJobsComponent
   */
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
