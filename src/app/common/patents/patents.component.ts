import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HelperGraphics } from 'src/app/_helpers/helperGraphics';
import { Direction, FindRequest, Order, Page, PageRequest, PaginatedSearchComponent } from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';
import { GraphicPatent } from 'src/app/_models/graphicPatent';
import { Patent } from 'src/app/_models/patent';
import { GraphicService } from 'src/app/_services/graphic.service';
import { PatentService } from 'src/app/_services/patent.service';


/**
 *
 *
 * @export
 * @class PatentsComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-patents',
  templateUrl: './patents.component.html'
})
export class PatentsComponent extends PaginatedSearchComponent<Patent> implements OnInit {
  /**
   * university id for filter
   *
   * @type {string}
   * @memberof PatentsComponent
   */
  @Input() idPrefix: string;
  @Input() url = '';
  @Input() authorId: string;
  @Input() organizationId: string;
  /**
   * all data shown on table
   *
   * @type {Page<SparqlResults>}
   * @memberof PatentsComponent
   */

  /**
   *
   *  find request
   * @type {FindRequest}
   * @memberof PatentsComponent
   */
  findRequest: FindRequest = new FindRequest();
  /**
   *
   *
   * @type {*}
   * @memberof PatentsComponent
   */
  echartOptions: any;
  /**
   *
   * if data from back is loadeding
   * @memberof PatentsComponent
   */
  loadingData = false;
  /**
   *
   * @type {boolean}
   * @memberof PatentsComponent
   */
  loaded = false;
  /**
   *
   * @type {boolean}
   * @memberof PatentsComponent
   */
  normalTree = true;
  dateIni;
  dateFin;

  /**
   * Creates an instance of PatentsComponent.
   * @param {PatentService} patentService
   * @memberof PatentsComponent
   */
  constructor(
    private patentService: PatentService,
    private graphicServcice: GraphicService,
    router: Router,
    translate: TranslateService,
    toastr: ToastrService
  ) {
    super(router, translate, toastr);
  }

  /**
   *
   *
   * @memberof PatentsComponent
   */
  ngOnInit(): void {

    if (this.authorId) {
      this.findRequest.filter.authorId = this.authorId;
    }
    if (this.organizationId) {
      this.findRequest.filter.organizationId = this.organizationId;
    }


    let xAxisData: Array<string> = [];
    let data1: Array<any> = [];
    let data2: Array<any> = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push(`category${i}`);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }


    this.graphicServcice.patentArea().subscribe(data => {
      this.echartOptions = HelperGraphics.configChartPie(this.transformData(data), 'Patentes por Organizacion');
    });
  }

  transformData(data: Array<GraphicPatent>) {

    const result = [];

    if (data.length > 1) {
      data.forEach(element => {
        result.push({ name: element.ownerOrganization, value: element.count });
      });
    }

    return {
      seriesData: result
    };

  }


  protected findInternal(findRequest: FindRequest): Observable<Page<Patent>> {
    if (this.authorId) {
      this.findRequest.filter.authorId = this.authorId;
    }
    if (this.organizationId) {
      this.findRequest.filter.organizationId = this.organizationId;
    }

    const page: Page<Patent> = new Page();
    const result = this.patentService.find(findRequest).pipe(
      map((x) => {
        this.loaded = true;
        return x;
      }), // return the received value true/false
      catchError((err) => {
        this.loaded = true;
        return of(page)
      }));
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
   *
   *
   * @param {PageRequest} pageRequest
   * @memberof PatentsComponent
   */
  allPatentsFilteredSortChanged(pageRequest: PageRequest) {
    this.findRequest.pageRequest.property = pageRequest.property;
    this.findRequest.pageRequest.direction = pageRequest.direction;
    this.patentService.find(this.findRequest).subscribe((data) => {
      this.resultObject = data;
      this.loaded = true;
    }, () => {
      this.loaded = true;
    });
  }

  /**
   *
   *
   * @memberof PatentsComponent
   */
  filterPatents() {
    this.findRequest.pageRequest.page = 0;
    this.loaded = false;
    setTimeout(() => {
      if (this.dateIni) {
        const currentDate = Helper.parse(this.dateIni);
        if (currentDate) {
          this.findRequest.filter.ini = currentDate;
        }
      } else {
        this.findRequest.filter.ini = null;
      }

      if (this.dateFin) {
        const currentDate = Helper.parse(this.dateFin);
        if (currentDate) {
          this.findRequest.filter.end = currentDate;
        }
      } else {
        this.findRequest.filter.end = null;
      }
      this.patentService.find(this.findRequest).subscribe((data) => {
        this.resultObject = data;
        this.loaded = true;
      }, () => {
        this.loaded = true;
      });
    }, 0);

  }


  /**
   *
   *
   * @memberof PatentsComponent
   */
  onChartInit() {
    this.loadingData = true;
  }

}
