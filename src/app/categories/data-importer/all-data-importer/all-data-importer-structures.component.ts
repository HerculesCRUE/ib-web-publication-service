import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Direction, FindRequest, Order, Page, PageRequest, PaginatedSearchComponent } from 'src/app/_helpers/search';
import { DataImporter } from 'src/app/_models/dataImporter';
import { DataImporterService } from 'src/app/_services/data-importer.service';

/**
 *
 *
 * @export
 * @class AllDataImporterStructuresComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-all-data-importer-structures',
  templateUrl: './all-data-importer-structures.component.html'
})
export class AllDataImporterStructuresComponent extends PaginatedSearchComponent<DataImporter> {
  loaded = false;

  findRequest: FindRequest = new FindRequest();

  constructor(
    private researchmentStructureService: DataImporterService,
    router: Router,
    translate: TranslateService,
    toastr: ToastrService
  ) {
    super(router, translate, toastr);
  }

  protected findInternal(findRequest: FindRequest): Observable<Page<DataImporter>> {
    const page: Page<DataImporter> = new Page();
    return this.researchmentStructureService.find(findRequest).pipe(
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
      property: 'startTime',
      direction: Direction.DESC
    };
  }

  /**
   * Filter researchment structures
   *
   * @param {string} filterName
   * @memberof AllResearchmentStructuresComponent
   */
  filterResearchmentStructures() {
    this.findRequest.pageRequest.page = 0;
    this.loaded = false;
    this.researchmentStructureService.find(this.findRequest).subscribe((data) => {
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
   * @memberof AllResearchmentStructuresComponent
   */
  allResearchmentStructuresFilteredSortChanged(pageRequest: PageRequest): void {
    this.findRequest.pageRequest.property = pageRequest.property;
    this.findRequest.pageRequest.direction = pageRequest.direction;
    this.researchmentStructureService.find(this.findRequest).subscribe((data) => {
      this.resultObject = data;
      this.loaded = true;
    }, () => {
      this.loaded = true;
    });
  }

}
