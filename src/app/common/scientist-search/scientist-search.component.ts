import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HelperGraphics } from 'src/app/_helpers/helperGraphics';
import { Direction, FindRequest, Order, Page, PageRequest, PaginatedSearchComponent } from 'src/app/_helpers/search';
import { Person } from 'src/app/_models/person';
import { PersonGraphic } from 'src/app/_models/personGraphic';
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
export class ScientistSearchComponent extends PaginatedSearchComponent<Person> implements OnInit {
  /**
   * university Id for search filter in case of necessary
   */
  @Input() idPrefix: string;
  @Input() organizationId: string;
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
    private graphicService: GraphicService,
    router: Router,
    translate: TranslateService,
    toastr: ToastrService
  ) {
    super(router, translate, toastr);
  }
  /**
   *
   *
   * @memberof ScientistSearchComponent
   */
  ngOnInit(): void {

    this.graphicService.personArea().subscribe(data => {
      this.echartOptions = HelperGraphics.configChartPie(this.newData(data), 'Número personas por area');
    });

    if (this.organizationId) {
      this.findRequest.filter.organizationId = this.organizationId;
    }
  }




  protected findInternal(findRequest: FindRequest): Observable<Page<Person>> {

    if (this.organizationId) {
      this.findRequest.filter.organizationId = this.organizationId;
    }

    const page: Page<Person> = new Page();
    return this.researchStaffServices.find(findRequest).pipe(
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
      property: 'id',
      direction: Direction.ASC
    };
  }


  /**
   *
   *
   * @param {Array<PersonGraphic>} data
   * @return {*} 
   * @memberof ScientistSearchComponent
   */
  newData(data: Array<PersonGraphic>) {
    const result = [];

    /**if (data.length > 0) {
      data.forEach(element => {
        result.push({ name: element.inheresInsubjectArea, value: element.count });
      });
    }*/

    return {
      seriesData: result
    };

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
      this.resultObject = res;
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
    this.findRequest.pageRequest.property = pageRequest.property;
    this.findRequest.pageRequest.direction = pageRequest.direction;
    this.researchStaffServices.find(this.findRequest).subscribe((data) => {
      this.resultObject = data;
      this.loaded = true;
    });
  }

}
