import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Direction, FindRequest, Order, Page, PageRequest, PaginatedSearchComponent } from 'src/app/_helpers/search';
import { SparqlQuery } from 'src/app/_models/sparqlQuery';
import { SparqlService } from 'src/app/_services/sparql.service';

@Component({
  selector: 'app-queries-management',
  templateUrl: './queries-management.component.html'
})
export class QueriesManagementComponent extends PaginatedSearchComponent<SparqlQuery> implements OnInit {

  findRequest: FindRequest = new FindRequest();

  loaded = false;


  constructor(
    private sparqlService: SparqlService,
    router: Router,
    translate: TranslateService,
    toastr: ToastrService
  ) {
    super(router, translate, toastr);
  }

  /**
   *
   *
   * @memberof PatentsComponent
   */
  ngOnInit(): void {
  }



  protected findInternal(findRequest: FindRequest): Observable<Page<SparqlQuery>> {

    const page: Page<SparqlQuery> = new Page();
    const result = this.sparqlService.find(findRequest).pipe(
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




  /**
   *
   *
   * @param {PageRequest} pageRequest
   * @memberof PatentsComponent
   */
  allPatentsFilteredSortChanged(pageRequest: PageRequest) {
    this.findRequest.pageRequest.property = pageRequest.property;
    this.findRequest.pageRequest.direction = pageRequest.direction;
    this.sparqlService.find(this.findRequest).subscribe((data) => {
      this.resultObject = data;
      this.loaded = true;
    }, () => {
      this.loaded = true;
    });
  }

  filterSparqlQueries() {

  }

}
