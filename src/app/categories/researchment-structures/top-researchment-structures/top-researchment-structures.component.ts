import { Component, OnInit } from '@angular/core';
import { FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
import { SparqlResults } from 'src/app/_models/sparql';
import { ResearchmentStructuresService } from 'src/app/_services/researchment.structures.service';

/**
 *
 *
 * @export
 * @class TopResearchmentStructuresComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-top-researchment-structures',
  templateUrl: './top-researchment-structures.component.html'
})
export class TopResearchmentStructuresComponent implements OnInit {


  topResearchmentStructuresFiltered: Page<SparqlResults>;

  filters: Map<string, string> = new Map();
  /**
   *
   *
   * @type {FindRequest}
   * @memberof TopResearchmentStructuresComponent
   */
  findRequest: FindRequest = new FindRequest();

  constructor(
    private researchmentStructureService: ResearchmentStructuresService
  ) {
  }

  ngOnInit(): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 1;
    pageRequest.size = 10;

    this.topResearchmentStructuresFiltered = this.researchmentStructureService.findTopResearchmentStructuresByFilters(
      null, pageRequest
    );
  }

  /**
   * Filter researchment structures
   *
   * @param {string} filterName
   * @memberof TopResearchmentStructuresComponent
   */
  filterResearchmentStructures(filterName: string) {
    switch (filterName) {
      case 'type':
        this.findRequest.filter.type !== 'undefined'
          ? this.filters.set(filterName, this.findRequest.filter.type)
          : this.filters.set(filterName, '');

        break;

      default:
        break;
    }

    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 1;
    pageRequest.size = this.topResearchmentStructuresFiltered.size;
    pageRequest.property = this.topResearchmentStructuresFiltered.sort;
    pageRequest.direction = this.topResearchmentStructuresFiltered.direction;

    // Call service to load data filtered
    this.topResearchmentStructuresFiltered = this.researchmentStructureService.findTopResearchmentStructuresByFilters(
      this.filters, pageRequest
    );

  }

  /**
   * Filter researchment structures
   *
   * @param {string} filterName
   * @memberof TopResearchmentStructuresComponent
   */
  filterTopResearchmentStructures(filterName: string) {
    switch (filterName) {
      case 'qa':
        // si el valor viene undefined debería "resetar el valor "
        this.findRequest.filter.qa !== 'undefined'
          ? this.filters.set(filterName, this.findRequest.filter.qa)
          : this.filters.set(filterName, '');
        break;

      default:
        break;
    }


    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 1;
    pageRequest.size = this.topResearchmentStructuresFiltered.size;
    pageRequest.property = this.topResearchmentStructuresFiltered.sort;
    pageRequest.direction = this.topResearchmentStructuresFiltered.direction;

    // Call service to load data filtered
    this.topResearchmentStructuresFiltered = this.researchmentStructureService.findTopResearchmentStructuresByFilters(
      this.filters, pageRequest
    );
  }

  /**
   *
   *
   * @param {number} i
   * @memberof TopResearchmentStructuresComponent
   */
  topResearchmentStructuresFilteredPageChanged(i: number): void {

    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = i;
    pageRequest.size = this.topResearchmentStructuresFiltered.size;
    pageRequest.property = this.topResearchmentStructuresFiltered.sort;
    pageRequest.direction = this.topResearchmentStructuresFiltered.direction;

    //  const map: Map<string, string> = new Map(Object.entries(this.findRequest.filter));

    this.topResearchmentStructuresFiltered = this.researchmentStructureService.findTopResearchmentStructuresByFilters(
      this.filters, pageRequest
    );
  }
  /**
   *
   *
   * @param {number} i
   * @memberof TopResearchmentStructuresComponent
   */
  topResearchmentStructuresFilteredSizeChanged(i: number): void {

    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = this.topResearchmentStructuresFiltered.number;
    pageRequest.size = i;
    pageRequest.property = this.topResearchmentStructuresFiltered.sort;
    pageRequest.direction = this.topResearchmentStructuresFiltered.direction;

    this.topResearchmentStructuresFiltered = this.researchmentStructureService.findTopResearchmentStructuresByFilters(
      this.filters, pageRequest
    );
  }

  /**
   *
   *
   * @param {PageRequest} pageRequest
   * @memberof TopResearchmentStructuresComponent
   */
  topResearchmentStructuresFilteredSortChanged(pageRequest: PageRequest): void {

    const newPageRequest: PageRequest = new PageRequest();
    newPageRequest.page = this.topResearchmentStructuresFiltered.number;
    newPageRequest.size = this.topResearchmentStructuresFiltered.size;
    newPageRequest.property = pageRequest.property;
    newPageRequest.direction = pageRequest.direction;

    this.topResearchmentStructuresFiltered = this.researchmentStructureService.findTopResearchmentStructuresByFilters(
      this.filters, pageRequest
    );
  }

}

