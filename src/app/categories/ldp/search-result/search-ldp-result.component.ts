import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Direction, FindRequest, Order, Page, PageRequest, PaginatedSearchComponent } from 'src/app/_helpers/search';
import { LdpSearchResult } from 'src/app/_models/ldpSearchResult';
import { LdpService } from 'src/app/_services/ldp.service';
import { Helper } from 'src/app/_helpers/utils';

/**
 *
 *
 * @export
 * @class SearchLdpResultComponent
 * @implements {OnInit}
 */@Component({
  selector: 'search-ldp-result',
  templateUrl: './search-ldp-result.component.html'
})
export class SearchLdpResultComponent extends PaginatedSearchComponent<LdpSearchResult> {
  loaded = false;

  findRequest: FindRequest = new FindRequest();

  title: string;

  category: string;

  categoryName: string;

  constructor(
    private researchmentStructureService: LdpService,
    router: Router,
    translate: TranslateService,
    private translateService: TranslateService,
    toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    super(router, translate, toastr);
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.title = params['title'];
        this.category = params['category'];
        this.translateService.get('ldp.category.values').subscribe((translations: any) => {
          this.categoryName = Helper.getLdpEntityName(this.category);
          if (translations && translations[this.categoryName]) {
            this.categoryName = translations[this.categoryName].s;
          }
        });
        if (this.loaded) {
          this.filterResearchmentStructures();
        }
      }
      );
  }

  protected findInternal(findRequest: FindRequest): Observable<Page<LdpSearchResult>> {
    const page: Page<LdpSearchResult> = new Page();
    let method: Observable<Page<LdpSearchResult>> = this.researchmentStructureService.findByTitle(this.title, findRequest);
    if (this.category) {
      method = this.researchmentStructureService.findByCategory(this.category, findRequest);
    }

    return method.pipe(
      map((x) => {
        this.loaded = true;
        return x;
      }), // return the received value true/false
      catchError((err) => {
        this.loaded = true;
        return of(page)
      }));
  }

  protected removeInternal(entity: any): Observable<any> {
    return of({});
  }

  protected getDefaultOrder(): Order {
    return {
      property: 'entity',
      direction: Direction.DESC
    };
  }

  /**
   * Filter researchment structures
   *
   * @param {string} filterName
   * @memberof SearchLdpResultComponent
   */
  filterResearchmentStructures() {
    this.findRequest.pageRequest.page = 0;
    this.loaded = false;
    let method: Observable<Page<LdpSearchResult>> = this.researchmentStructureService.findByTitle(this.title, this.findRequest);
    if (this.category) {
      method = this.researchmentStructureService.findByCategory(this.category, this.findRequest);
    }
    method.subscribe((data) => {
      this.resultObject = data;
      this.loaded = true;
    }, () => {
      this.loaded = true;
    });

  }

  /**
   * Function called on sortChanged event of TableResultsComponent
   *
   * @param {PageRequest} pageRequest
   * @memberof SearchLdpResultComponent
   */
  allResearchmentStructuresFilteredSortChanged(pageRequest: PageRequest): void {
    this.findRequest.pageRequest.property = pageRequest.property;
    this.findRequest.pageRequest.direction = pageRequest.direction;
    let method: Observable<Page<LdpSearchResult>> = this.researchmentStructureService.findByTitle(this.title, this.findRequest);
    if (this.category) {
      method = this.researchmentStructureService.findByCategory(this.category, this.findRequest);
    }
    method.subscribe((data) => {
      this.resultObject = data;
      this.loaded = true;
    }, () => {
      this.loaded = true;
    });
  }

}