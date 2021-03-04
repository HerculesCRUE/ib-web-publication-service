import { Component, Input, OnInit } from '@angular/core';
import { FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';
import { SparqlResults } from 'src/app/_models/sparql';
import { TableResultsHeaderItem } from 'src/app/_models/table-results';
import { ParticipantService } from 'src/app/_services/participant.service';

/**
 *
 *
 * @export
 * @class DeliverableComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-deliverable',
  templateUrl: './deliverable.component.html'
})
export class DeliverableComponent implements OnInit {
  /**
   *
   *
   * @type {FindRequest}
   * @memberof DeliverableComponent
   */
  findRequest: FindRequest = new FindRequest();
  /**
   *
   *
   * @memberof DeliverableComponent
   */
  loaded = false;
  /**
   *
   *
   * @type {string}
   * @memberof DeliverableComponent
   */
  @Input() universityId: string;
  /**
   *
   *
   * @type {Page<SparqlResults>}
   * @memberof DeliverableComponent
   */
  allData: Page<SparqlResults> = new Page();
  /**
   *
   *
   * @memberof DeliverableComponent
   */
  yearsForSelect = Helper.getYears();

  /**
   *
   *
   * @type {TableResultsHeaderItem[]}
   * @memberof DeliverableComponent
   */
  headerData: TableResultsHeaderItem[] = [
    {
      textToTranslate: 'deliverable.table-header.title',
      columnName: 'title'
    },
    {
      textToTranslate: 'deliverable.table-header.type',
      columnName: 'type'
    },
    {
      textToTranslate: 'deliverable.table-header.doi',
      columnName: 'doi'
    },
    {
      textToTranslate: 'deliverable.table-header.release-year',
      columnName: 'releaseYear'
    }
  ];
  /**
   * Creates an instance of DeliverableComponent.
   * @param {ParticipantService} participantService
   * @memberof DeliverableComponent
   */
  constructor(private participantService: ParticipantService) {
  }


  /**
   *
   *
   * @memberof DeliverableComponent
   */
  ngOnInit(): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 1;
    pageRequest.size = 10;
    this.allData = this.participantService.find(
      null, pageRequest
    );
    setTimeout(() => {
      this.loaded = true;
    }, 300);

  }

  /**
   *
   *
   * @param {number} i
   * @memberof ScientificProductionComponent
   */
  allfilter(i: number): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = i;
    pageRequest.size = this.allData.size;
    pageRequest.property = this.allData.sort;
    pageRequest.direction = this.allData.direction;
    this.loaded = true;
  }

  /**
   *
   *
   * @param {number} i
   * @memberof DeliverableComponent
   */
  allprojectsFilteredPageChanged(i: number): void {
    this.loaded = true;
  }

  /**
   *
   *
   * @param {number} i
   * @memberof DeliverableComponent
   */
  allprojectsFilteredSizeChanged(i: number): void {
    this.loaded = true;
  }

  /**
   *
   *
   * @param {PageRequest} pageRequest
   * @memberof DeliverableComponent
   */
  allprojectsFilteredSortChanged(pageRequest: PageRequest) {
    this.loaded = true;
  }


}
