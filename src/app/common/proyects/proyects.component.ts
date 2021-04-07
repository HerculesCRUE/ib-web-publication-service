import { Component, Input, OnInit } from '@angular/core';
import { Direction, FindRequest, Order, Page, PageRequest, PaginatedSearchComponent } from 'src/app/_helpers/search';
import { ProjectService } from 'src/app/_services/project.service';
import { Helper } from 'src/app/_helpers/utils';
import { HelperGraphics } from 'src/app/_helpers/helperGraphics';
import { SeriesBarData } from 'src/app/_models/seriesBarData';
import { Project } from 'src/app/_models/project';
import { GraphicService } from 'src/app/_services/graphic.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { GraphicModelTree } from 'src/app/_models/graphicModelTree';

/**
 *
 *
 * @export
 * @class ProyectsComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html'
})
export class ProyectsComponent extends PaginatedSearchComponent<Project> implements OnInit {
  /**
   *
   *
   * @type {string}
   * @memberof ProyectsComponent
   */
  @Input() idPrefix: string;
  @Input() url = './project/';
  /**
   *
   *
   * @type {string}
   * @memberof ProyectsComponent
   */
  @Input() chartType: string;
  /**
   *
   *
   * @type {FindRequest}
   * @memberof ProyectsComponent
   */
  findRequest: FindRequest = new FindRequest();
  /**
   *
   *
   * @type {*}
   * @memberof ProyectsComponent
   */
  echartOptions: any;
  /**
   *
   * @type {boolean}
   * @memberof ProyectsComponent
   */
  loadingData = false;
  /**
   *
   * @type {boolean}
   * @memberof ProyectsComponent
   */
  loaded = false;
  /**
   *
   *
   * @type {number}
   * @memberof ProyectsComponent
   */
  dateIni: number;
  /**
   *
   *
   * @type {number}
   * @memberof ProyectsComponent
   */
  dateFin: number;
  /**
   *
   * @type {boolean}
   * @memberof ProyectsComponent
   */
  normalTree = true;

  /**
   * Creates an instance of ProyectsComponent.
   * @param {ProjectService} projectService
   * @memberof ProyectsComponent
   */
  constructor(
    private projectService: ProjectService,
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
   * @memberof ProyectsComponent
   */
  ngOnInit(): void {
    let xAxisData: Array<string> = [];
    let data1: Array<any> = [];
    let data2: Array<any> = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push(`category${i}`);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }
    if (this.chartType === 'bar') {
      const legend = ['Proyectos año 2019', 'Proyectos año 2020'];
      const barData: Array<SeriesBarData> = [{
        name: 'Proyectos año 2019',
        type: 'bar',
        data: data1,
        animationDelay: (idx) => idx * 10,
      },
      {
        name: 'Proyectos año 2020',
        type: 'bar',
        data: data2,
        animationDelay: (idx) => idx * 10 + 100,
      }];
      this.echartOptions = HelperGraphics.configChartBar(xAxisData, barData, legend);
    } else {

      this.graphicServcice.projectInvestigation().subscribe(treeData => {
        this.echartOptions = HelperGraphics.configChartTree(this.makeDataForTree(treeData));
      });

    }


  }
  makeDataForTree(data: Array<GraphicModelTree>) {
    const result = [];

    if (data.length > 1) {
      data.forEach(element => {
        result.push({ name: element.modality, value: element.count });
      });
    }

    return result;

  }

  protected findInternal(findRequest: FindRequest): Observable<Page<Project>> {

    const result = this.projectService.find(findRequest);
    result.subscribe(data => {
      this.loaded = true;
    });
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
   * @memberof ProyectsComponent
   */
  onChartInit() {
    this.loadingData = true;
  }





  /**
   *
   *
   * @param {PageRequest} pageRequest
   * @memberof ProyectsComponent
   */
  allprojectsFilteredSortChanged(pageRequest: PageRequest) {
    this.findRequest.pageRequest.property = pageRequest.property;
    this.findRequest.pageRequest.direction = pageRequest.direction;
    this.projectService.find(this.findRequest).subscribe((data) => {
      this.resultObject = data;
      this.loaded = true;
    });
  }



  /**
   *
   *
   * @memberof ProyectsComponent
   */
  filterProjects() {
    this.findRequest.pageRequest.page = 0;
    setTimeout(() => {
      if (this.dateIni) {
        const currentDate = Helper.parse(this.dateIni);
        if (currentDate) {
          this.findRequest.filter.start = currentDate;
        }
      } else {
        this.findRequest.filter.start = null;
      }

      if (this.dateFin) {
        const currentDate = Helper.parse(this.dateFin);
        if (currentDate) {
          this.findRequest.filter.end = currentDate;
        }
      } else {
        this.findRequest.filter.end = null;
      }
      this.projectService.find(this.findRequest).subscribe((data) => {
        this.resultObject = data;
        this.loaded = true;
      });
    }, 0);
  }

}
