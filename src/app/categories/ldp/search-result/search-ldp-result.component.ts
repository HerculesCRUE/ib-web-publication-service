import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Direction, FindRequest, Order, Page, PageRequest, PaginatedSearchComponent } from 'src/app/_helpers/search';
import { LdpSearchResult } from 'src/app/_models/ldpSearchResult';
import { LdpService } from 'src/app/_services/ldp.service';

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

  constructor(
    private researchmentStructureService: LdpService,
    router: Router,
    translate: TranslateService,
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
        if (this.loaded) {
          this.filterResearchmentStructures();
        }
      }
      );
  }

  protected findInternal(findRequest: FindRequest): Observable<Page<LdpSearchResult>> {
    const page: Page<LdpSearchResult> = new Page();
    return this.researchmentStructureService.findByTitle(this.title, findRequest).pipe(
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
    this.researchmentStructureService.findByTitle(this.title, this.findRequest).subscribe((data) => {
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
    this.researchmentStructureService.findByTitle(this.title, this.findRequest).subscribe((data) => {
      this.resultObject = data;
      this.loaded = true;
    }, () => {
      this.loaded = true;
    });
  }

}