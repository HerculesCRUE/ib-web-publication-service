import { Component, Input, OnInit } from '@angular/core';
import { FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';
import { SparqlResults } from 'src/app/_models/sparql';
import { BusinnessActivityService } from 'src/app/_services/businnessActivity.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html'
})
export class BusinessComponent implements OnInit {
  /**
   *
   *
   * @type {FindRequest}
   * @memberof BusinessComponent
   */
  findRequest: FindRequest = new FindRequest();
  /**
   *
   *
   * @memberof BusinessComponent
   */
  loaded = false;

  @Input() type: string;
  /**
   *
   *
   * @type {Page<SparqlResults>}
   * @memberof BusinessComponent
   */
  allData: Page<SparqlResults> = new Page();
  /**
   *
   *
   * @memberof BusinessComponent
   */
  yearsForSelect = Helper.getYears();
  filters: Map<string, string> = new Map();
  /**
   * Creates an instance of BusinessComponent.
   * @param {ParticipantService} participantService
   * @memberof BusinessComponent
   */
  constructor(private businessService: BusinnessActivityService) {
  }


  /**
   *
   *
   * @memberof BusinessComponent
   */
  ngOnInit(): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 1;
    pageRequest.size = 10;
    if (this.type === 'comunidades') {
      this.allData = this.businessService.findComunidad(
        null, pageRequest
      );
    }
    if (this.type === 'centros') {
      this.allData = this.businessService.findCentros(
        null, pageRequest
      );
    }
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
    this.loaded = false;
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
   * @memberof BusinessComponent
   */
  allprojectsFilteredPageChanged(i: number): void {
    this.loaded = true;
    this.findRequest.pageRequest.page = i - 1;
    this.findRequest.pageRequest.size = this.allData.size;
    if (this.type === 'comunidades') {
      this.allData = this.businessService.findComunidad(
        null, this.findRequest.pageRequest
      );
    }
    if (this.type === 'centros') {
      this.allData = this.businessService.findCentros(
        null, this.findRequest.pageRequest
      );
    }
  }

  /**
   *
   *
   * @param {number} i
   * @memberof BusinessComponent
   */
  allprojectsFilteredSizeChanged(i: number): void {
    this.loaded = true;
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = this.allData.number;
    pageRequest.size = i;
    pageRequest.direction = this.allData.direction;
    this.findRequest.pageRequest = pageRequest;
    if (this.type === 'comunidades') {
      this.allData = this.businessService.findComunidad(
        null, pageRequest
      );
    }
    if (this.type === 'centros') {
      this.allData = this.businessService.findCentros(
        null, pageRequest
      );
    }
  }

  /**
   *
   *
   * @param {PageRequest} pageRequest
   * @memberof BusinessComponent
   */
  allprojectsFilteredSortChanged(pageRequest: PageRequest) {
    this.loaded = true;
    const newPageRequest: PageRequest = new PageRequest();
    newPageRequest.page = this.allData.number;
    newPageRequest.size = this.allData.size;
    newPageRequest.property = pageRequest.property;
    newPageRequest.direction = pageRequest.direction;
    this.findRequest.pageRequest = pageRequest;
    if (this.type === 'comunidades') {
      this.allData = this.businessService.findComunidad(
        null, pageRequest
      );
    }
    if (this.type === 'centros') {
      this.allData = this.businessService.findCentros(
        null, pageRequest
      );
    }
  }


}
