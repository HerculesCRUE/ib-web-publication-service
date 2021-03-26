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
    this.findRequest.pageRequest.page = 0;
    this.findRequest.pageRequest.size = 10;
    this.findRequest.pageRequest.direction = Direction.ASC;
    /* this.researchmentStructureService.find(this.findRequest).subscribe((data) => {
       this.resultObject = data;
       this.loaded = true;
     });*/
  }

  protected findInternal(findRequest: FindRequest): Observable<Page<University>> {

    const result = this.researchmentStructureService.find(findRequest);
    result.subscribe(data => {
      this.loaded = true;
    });
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
    this.loaded = false;
    this.researchmentStructureService.find(this.findRequest).subscribe((data) => {
      this.resultObject = data;
      this.loaded = true;
    });

  }



  /**
   * Function called on pageChanged event of TableResultsComponent
   *
   * @param {number} i
   * @memberof AllResearchmentStructuresComponent
   
  allResearchmentStructuresFilteredPageChanged(i: number): void {
    this.loaded = false;
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = i - 1;
    pageRequest.size = this.allResearchmentStructuresFiltered.size;
    pageRequest.property = this.findRequest.pageRequest.property;
    pageRequest.direction = this.findRequest.pageRequest.direction;
    this.findRequest.pageRequest = pageRequest;

    this.researchmentStructureService.find(this.findRequest).subscribe((data) => {
      this.allResearchmentStructuresFiltered = data;
      this.loaded = true;
    });
  }*/

  /**
   * Function called on sizeChanged event of TableResultsComponent
   *
   * @param {number} i
   * @memberof AllResearchmentStructuresComponent
   
  allResearchmentStructuresFilteredSizeChanged(i: number): void {
    this.loaded = false;
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = this.allResearchmentStructuresFiltered.number;
    pageRequest.size = i;
    pageRequest.property = this.findRequest.pageRequest.property;
    pageRequest.direction = this.findRequest.pageRequest.direction;
    this.findRequest.pageRequest = pageRequest;

    this.researchmentStructureService.find(this.findRequest).subscribe((data) => {
      this.allResearchmentStructuresFiltered = data;
      this.loaded = true;
    });
  }*/


  /**
   * Function called on sortChanged event of TableResultsComponent
   *
   * @param {PageRequest} pageRequest
   * @memberof AllResearchmentStructuresComponent
   */
  allResearchmentStructuresFilteredSortChanged(pageRequest: PageRequest): void {

    const newPageRequest: PageRequest = new PageRequest();
    newPageRequest.page = this.resultObject.number;
    newPageRequest.size = this.resultObject.size;
    newPageRequest.property = pageRequest.property;
    newPageRequest.direction = pageRequest.direction;
    this.findRequest.pageRequest = pageRequest;
    this.researchmentStructureService.find(this.findRequest).subscribe((data) => {
      this.resultObject = data;
      this.loaded = true;
    });
  }

}
