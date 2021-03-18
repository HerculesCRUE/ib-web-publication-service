import { Component, Input, OnInit } from '@angular/core';
import { HelperGraphics } from 'src/app/_helpers/helperGraphics';
import { FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';
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
export class PatentsComponent implements OnInit {
  /**
   * university id for filter
   *
   * @type {string}
   * @memberof PatentsComponent
   */
  @Input() idPrefix: string;
  /**
   * all data shown on table
   *
   * @type {Page<SparqlResults>}
   * @memberof PatentsComponent
   */
  allPatentFiltered: Page<Patent>;
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
    private graphicServcice: GraphicService) {
  }


  /**
   *
   *
   * @memberof PatentsComponent
   */
  ngOnInit(): void {

    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 0;
    pageRequest.size = 10;
    this.findRequest.pageRequest = pageRequest;
    this.patentService.find(this.findRequest).subscribe(res => {
      this.allPatentFiltered = res;
      this.loaded = true;
    });
    let xAxisData: Array<string> = [];
    let data1: Array<any> = [];
    let data2: Array<any> = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push(`category${i}`);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }


    this.graphicServcice.patentArea().subscribe(data => {
      this.echartOptions = HelperGraphics.configChartPie(data, 'Sello de Calidad', 'Personal por tipo filtrado por area');

    });
  }


  /**
   *
   *
   * @param {number} i
   * @memberof PatentsComponent
   */
  allPatentsFilteredPageChanged(i: number): void {
    this.findRequest.pageRequest.page = i - 1;
    this.findRequest.pageRequest.size = this.allPatentFiltered.size;
    this.patentService.find(this.findRequest).subscribe((data) => {
      this.allPatentFiltered = data;
      this.loaded = true;
    });
  }


  /**
   *
   *
   * @param {number} i
   * @memberof PatentsComponent
   */
  allPatentsFilteredSizeChanged(i: number): void {

    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = this.allPatentFiltered.number;
    pageRequest.size = i;
    pageRequest.direction = this.allPatentFiltered.direction;
    this.findRequest.pageRequest = pageRequest;
    this.patentService.find(this.findRequest).subscribe((data) => {
      this.allPatentFiltered = data;
      this.loaded = true;
    });
  }


  /**
   *
   *
   * @param {PageRequest} pageRequest
   * @memberof PatentsComponent
   */
  allPatentsFilteredSortChanged(pageRequest: PageRequest) {
    const newPageRequest: PageRequest = new PageRequest();
    newPageRequest.page = this.allPatentFiltered.number;
    newPageRequest.size = this.allPatentFiltered.size;
    newPageRequest.property = pageRequest.property;
    newPageRequest.direction = pageRequest.direction;
    this.findRequest.pageRequest = pageRequest;
    this.patentService.find(this.findRequest).subscribe((data) => {
      this.allPatentFiltered = data;
      this.loaded = true;
    });
  }

  /**
   *
   *
   * @memberof PatentsComponent
   */
  filterPatents() {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 0;
    pageRequest.size = this.allPatentFiltered.size;
    this.findRequest.pageRequest = pageRequest;
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
        this.allPatentFiltered = data;
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
