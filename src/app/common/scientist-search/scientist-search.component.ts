import { Component, Input, OnInit } from '@angular/core';
import { HelperGraphics } from 'src/app/_helpers/helperGraphics';
import { FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';
import { Person } from 'src/app/_models/person';
import { SparqlResults } from 'src/app/_models/sparql';
import { TableResultsHeaderItem } from 'src/app/_models/table-results';
import { GraphicService } from 'src/app/_services/graphic.service';
import { ResearchStaffService } from 'src/app/_services/research-staff.service';
/**
 *
 *
 * @export
 * @class ScientistSearchComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-scientist-search',
  templateUrl: './scientist-search.component.html'
})
export class ScientistSearchComponent implements OnInit {
  /**
   * university Id for search filter in case of necessary
   */
  @Input() idPrefix: string;
  /**
   *
   *
   * @type {Page<SparqlResults>}
   * @memberof ScientistSearchComponent
   */
  allScientificsFiltered: Page<Person> = new Page();
  /**
   *
   *
   * @type {Map<string, string>}
   * @memberof ScientistSearchComponent
   */
  filters: Map<string, string> = new Map();
  /**
   *
   *
   * @type {FindRequest}
   * @memberof ScientistSearchComponent
   */
  findRequest: FindRequest = new FindRequest();
  /**
   *
   *
   * @type {*}
   * @memberof ScientistSearchComponent
   */
  echartOptions: any;
  /**
   *
   *
   * @memberof ScientistSearchComponent
   */
  normalTree = true;
  @Input() url = './';
  /**
   *
   *
   * @memberof ScientistSearchComponent
   */
  loaded = false;


  /**
   * Constructor
   * param router 
   * param translate 
   * param toastr 
   * param researchmentStructureService 
   * param cdr 
   */
  constructor(
    private researchStaffServices: ResearchStaffService,
    private graphicService: GraphicService) {
  }

  /**
   *
   *
   * @memberof ScientistSearchComponent
   */
  ngOnInit(): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 1;
    pageRequest.size = 10;
    this.researchStaffServices.find(this.findRequest).subscribe(res => {
      this.allScientificsFiltered = res;
      this.loaded = true;
    });

    const xAxisData: Array<string> = [];
    const data1: Array<any> = [];
    const data2: Array<any> = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push(`category${i}`);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }


    this.graphicService.personArea().subscribe(data => {
      this.echartOptions = HelperGraphics.configChartPie(data, 'Sello de Calidad', 'Personal por tipo filtrado por area');
    });
  }

  /**
   *
   *
   * @param {number} i
   * @memberof ScientificProductionComponent
   */
  allScientistsFilteredPageChanged(i: number): void {
    this.loaded = false;
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = i;
    pageRequest.size = this.allScientificsFiltered.size;
    pageRequest.property = this.allScientificsFiltered.sort;
    pageRequest.direction = this.allScientificsFiltered.direction;
    this.researchStaffServices.find(this.findRequest).subscribe(res => {
      this.allScientificsFiltered = res;
      this.loaded = true;
    });
  }

  /**
   *
   *
   * @param {*} event
   * @param {string} filterName
   * @memberof ScientificProductionComponent
   */
  filterTop(event, filterName: string) {
    this.findRequest.pageRequest.page = 0;
    this.loaded = false;
    event !== 'undefined' ? this.filters.set(filterName, event) : this.filters.set(filterName, '');
    // Call service to load data filtered
    this.researchStaffServices.find(this.findRequest).subscribe(res => {
      this.allScientificsFiltered = res;
      this.loaded = true;
    });
  }

  /**
   *
   *
   * @param {number} i
   * @memberof ScientistSearchComponent
   */
  allScientistsFilteredSizeChanged(i: number): void {
    this.loaded = false;
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = this.allScientificsFiltered.number;
    pageRequest.size = i;
    pageRequest.direction = this.allScientificsFiltered.direction;
    this.findRequest.pageRequest = pageRequest;
    this.researchStaffServices.find(this.findRequest).subscribe((data) => {
      this.allScientificsFiltered = data;
      this.loaded = true;
    });
  }

  /**
   *
   *
   * @param {PageRequest} pageRequest
   * @memberof ScientistSearchComponent
   */
  allScientistsFilteredSortChanged(pageRequest: PageRequest) {
    this.loaded = false;
    const newPageRequest: PageRequest = new PageRequest();
    newPageRequest.page = this.allScientificsFiltered.number;
    newPageRequest.size = this.allScientificsFiltered.size;
    newPageRequest.property = pageRequest.property;
    newPageRequest.direction = pageRequest.direction;
    this.findRequest.pageRequest = pageRequest;
    this.researchStaffServices.find(this.findRequest).subscribe((data) => {
      this.allScientificsFiltered = data;
      this.loaded = true;
    });
  }

}
