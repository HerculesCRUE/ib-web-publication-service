import { Component, OnInit } from '@angular/core';
import { FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
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
export class AllResearchmentStructuresComponent implements OnInit {

  allResearchmentStructuresFiltered: Page<University>;

  loaded = false;

  findRequest: FindRequest = new FindRequest();

  constructor(
    private researchmentStructureService: ResearchmentStructuresService
  ) {
  }

  ngOnInit(): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 1;
    pageRequest.size = 10;

    this.researchmentStructureService.find(this.findRequest).subscribe((data) => {
      this.allResearchmentStructuresFiltered = data;
      this.loaded = true;
    });
  }

  /**
   * Filter researchment structures
   *
   * @param {string} filterName
   * @memberof AllResearchmentStructuresComponent
   */
  filterResearchmentStructures(filterName: string) {

    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 1;
    pageRequest.size = this.allResearchmentStructuresFiltered.size;
    pageRequest.property = this.allResearchmentStructuresFiltered.sort;
    pageRequest.direction = this.allResearchmentStructuresFiltered.direction;
    this.findRequest.pageRequest = pageRequest;
    this.researchmentStructureService.find(this.findRequest).subscribe((data) => {
      this.allResearchmentStructuresFiltered = data;
    });

  }



  /**
   * Function called on pageChanged event of TableResultsComponent
   *
   * @param {number} i
   * @memberof AllResearchmentStructuresComponent
   */
  allResearchmentStructuresFilteredPageChanged(i: number): void {

    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = i;
    pageRequest.size = this.allResearchmentStructuresFiltered.size;
    pageRequest.property = this.allResearchmentStructuresFiltered.sort;
    pageRequest.direction = this.allResearchmentStructuresFiltered.direction;
    this.findRequest.pageRequest = pageRequest;

    this.researchmentStructureService.find(this.findRequest).subscribe((data) => {
      this.allResearchmentStructuresFiltered = data;
    });
  }

  /**
   * Function called on sizeChanged event of TableResultsComponent
   *
   * @param {number} i
   * @memberof AllResearchmentStructuresComponent
   */
  allResearchmentStructuresFilteredSizeChanged(i: number): void {

    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = this.allResearchmentStructuresFiltered.number;
    pageRequest.size = i;
    pageRequest.property = this.allResearchmentStructuresFiltered.sort;
    pageRequest.direction = this.allResearchmentStructuresFiltered.direction;
    this.findRequest.pageRequest = pageRequest;

    this.researchmentStructureService.find(this.findRequest).subscribe((data) => {
      this.allResearchmentStructuresFiltered = data;
    });
  }


  /**
   * Function called on sortChanged event of TableResultsComponent
   *
   * @param {PageRequest} pageRequest
   * @memberof AllResearchmentStructuresComponent
   */
  allResearchmentStructuresFilteredSortChanged(pageRequest: PageRequest): void {

    const newPageRequest: PageRequest = new PageRequest();
    newPageRequest.page = this.allResearchmentStructuresFiltered.number;
    newPageRequest.size = this.allResearchmentStructuresFiltered.size;
    newPageRequest.property = pageRequest.property;
    newPageRequest.direction = pageRequest.direction;

    this.findRequest.pageRequest = pageRequest;

    this.researchmentStructureService.find(this.findRequest).subscribe((data) => {
      this.allResearchmentStructuresFiltered = data;
    });
  }

}
