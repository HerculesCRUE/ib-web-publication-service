import { Component, OnInit } from '@angular/core';
import { FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
import { SparqlResults } from 'src/app/_models/sparql';
import { TableResultsHeaderItem } from 'src/app/_models/table-results';
import { DirectedJobsService } from 'src/app/_services/directedJobs.service';

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
  filterDocuments() {
    this.loaded = true;
  }
  allParticipantsFilteredPageChanged(i: number) {
    this.loaded = true;
  }
  allParticipantsFilteredSizeChanged(i: number) {
    this.loaded = true;
  }
  allParticipantsFilteredSortChanged(pageRequest: PageRequest) {
    this.loaded = true;
  }
}
