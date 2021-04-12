import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Direction, FindRequest, Order, Page, PageRequest, PaginatedSearchComponent } from 'src/app/_helpers/search';
import { University } from 'src/app/_models/university';
import { ResearchmentStructuresService } from 'src/app/_services/researchment.structures.service';

/**
 *
 *
 * @export
 * @class AllResearchmentStructuresComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-all-researchment-structures',
  templateUrl: './all-researchment-structures.component.html'
})
export class AllResearchmentStructuresComponent extends PaginatedSearchComponent<University> implements OnInit {
  loaded = false;

  findRequest: FindRequest = new FindRequest();

  constructor(
    private researchmentStructureService: ResearchmentStructuresService,
    router: Router,
    translate: TranslateService,
    toastr: ToastrService
  ) {
    super(router, translate, toastr);
  }

  ngOnInit(): void {

  }

  protected findInternal(findRequest: FindRequest): Observable<Page<University>> {

    const result = this.researchmentStructureService.find(findRequest);
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
    });
  }

}
