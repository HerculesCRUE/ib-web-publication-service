import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Direction, FindRequest, Order, Page, PageRequest, PaginatedSearchComponent } from 'src/app/_helpers/search';
import { SparqlQuery } from 'src/app/_models/sparqlQuery';
import { SparqlService } from 'src/app/_services/sparql.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { SparqlQueryFromType } from 'src/app/_enums/sparqlQueryFromType';
import { LoginService } from 'src/app/_services/login.service';
@Component({
  selector: 'app-queries-management',
  templateUrl: './queries-management.component.html'
})
export class QueriesManagementComponent extends PaginatedSearchComponent<SparqlQuery> implements OnInit, OnChanges {

  findRequest: FindRequest = new FindRequest();
  @Input() yasqui: any;
  @Input() resetFind: number;
  loaded = false;
  queryTypes;


  constructor(
    private loginService: LoginService,
    private sparqlService: SparqlService,
    private translateS: TranslateService,
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
    this.queryTypes = this.ToArray(SparqlQueryFromType);
  }
  ToArray(enumme) {
    const StringIsNumber = value => isNaN(Number(value)) === false;
    return Object.keys(enumme)
      .filter(StringIsNumber)
      .map(key => enumme[key]);
  }
  ngOnChanges(changes) {
    this.find();
  }

  protected findInternal(findRequest: FindRequest): Observable<Page<SparqlQuery>> {
    if (!localStorage.getItem('user_name')) {
      this.loginService.getName().subscribe((name) => {
        this.findRequest.filter.sparqlName = name.username;
      });
    } else {
      this.findRequest.filter.sparqlName = localStorage.getItem('user_name');
    }
    const page: Page<SparqlQuery> = new Page();
    return this.sparqlService.find(findRequest).pipe(
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
      property: 'entityId',
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
    this.sparqlService.find(this.findRequest).subscribe((data) => {
      this.resultObject = data;
      this.loaded = true;
    }, () => {
      this.loaded = true;
    });
  }

  deleteQUery(id: string) {
    Swal.fire({
      html: this.translateS.instant('form.delete-message'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translateS.instant('form.yes'),
      cancelButtonText: this.translateS.instant('form.cancel')
    }).then(result => {
      if (result.value) {
        this.sparqlService.delete(id).subscribe(data => {
          this.resultObject.content = this.resultObject.content.filter(obj => obj['entityId'] !== id);
        });
      }
    });

  }

  useQuery(query: string) {
    this.yasqui.setValue(query);

  }

}
