import { Component, Input, OnInit } from '@angular/core';
import { FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';
import { SparqlResults } from 'src/app/_models/sparql';
import { TableResultsHeaderItem } from 'src/app/_models/table-results';
import { DirectedJobsService } from 'src/app/_services/directedJobs.service';

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
export class DirectedJobsComponent implements OnInit {
  /**
   *
   *
   * @type {FindRequest}
   * @memberof DirectedJobsComponent
   */
  findRequest: FindRequest = new FindRequest();
  @Input() idPrefix: string;
  /**
   *
   *
   * @memberof DirectedJobsComponent
   */
  loaded = false;
  /**
   *
   *
   * @type {Page<SparqlResults>}
   * @memberof DirectedJobsComponent
   */
  allDirectedJobs: Page<SparqlResults> = new Page();
  /**
   *
   *
   * @type {TableResultsHeaderItem[]}
   * @memberof DirectedJobsComponent
   */
  headerData: TableResultsHeaderItem[] = [
    {
      textToTranslate: 'directed-jobs.table-header.title',
      columnName: 'title'
    },
    {
      textToTranslate: 'directed-jobs.table-header.type',
      columnName: 'type'
    },
    {
      textToTranslate: 'directed-jobs.table-header.keywords',
      columnName: 'keywords'
    },
    {
      textToTranslate: 'directed-jobs.table-header.release-year',
      columnName: 'releaseYear'
    }
  ];
  /**
   *
   *
   * @memberof DirectedJobsComponent
   */
  yearsForSelect = Helper.getYears();
  filters: Map<string, string> = new Map();

  constructor(private directedJobsService: DirectedJobsService) { }

  ngOnInit(): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 1;
    pageRequest.size = 10;
    this.allDirectedJobs = this.directedJobsService.find(
      null, pageRequest
    );
    this.loaded = true;
  }

  /**
   *
   *
   * @memberof DirectedJobsComponent
   */
  filteDirectedJobs() {
    this.loaded = true;
  }
  /**
   *
   *
   * @param {number} i
   * @memberof DirectedJobsComponent
   */
  allDirectedFilteredPageChanged(i: number) {
    this.loaded = true;
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = i;
    pageRequest.size = this.allDirectedJobs.size;
    pageRequest.property = this.allDirectedJobs.sort;
    pageRequest.direction = this.allDirectedJobs.direction;
    this.allDirectedJobs = this.directedJobsService.findByFilters(
      this.filters, pageRequest
    );
  }
  /**
   *
   *
   * @param {number} i
   * @memberof DirectedJobsComponent
   */
  allDirectedFilteredSizeChanged(i: number) {
    this.loaded = true;
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = this.allDirectedJobs.number;
    pageRequest.size = i;
    pageRequest.property = this.allDirectedJobs.sort;
    pageRequest.direction = this.allDirectedJobs.direction;

    this.allDirectedJobs = this.directedJobsService.findByFilters(
      this.filters, pageRequest
    );
  }
  /**
   *
   *
   * @param {PageRequest} pageRequest
   * @memberof DirectedJobsComponent
   */
  allDirectedFilteredSortChanged(pageRequest: PageRequest) {
    this.loaded = true;
    const newPageRequest: PageRequest = new PageRequest();
    newPageRequest.page = this.allDirectedJobs.number;
    newPageRequest.size = this.allDirectedJobs.size;
    newPageRequest.property = pageRequest.property;
    newPageRequest.direction = pageRequest.direction;

    this.allDirectedJobs = this.directedJobsService.findByFilters(
      this.filters, pageRequest
    );
  }
}
