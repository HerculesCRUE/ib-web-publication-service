import { Component, Input, OnInit } from '@angular/core';
import { FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
import { ProjectService } from 'src/app/_services/project.service';
import { Helper } from 'src/app/_helpers/utils';
import { HelperGraphics } from 'src/app/_helpers/helperGraphics';
import { SeriesBarData } from 'src/app/_models/seriesBarData';
import { Project } from 'src/app/_models/project';
import { GraphicService } from 'src/app/_services/graphic.service';

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
export class ProyectsComponent implements OnInit {
  /**
   *
   *
   * @type {string}
   * @memberof ProyectsComponent
   */
  @Input() idPrefix: string;
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
   * @type {Page<SparqlResults>}
   * @memberof ProyectsComponent
   */
  allProjectFiltered: Page<Project>;
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
  loadedProjects = false;
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
    private graphicServcice: GraphicService
  ) {
  }

  /**
   *
   *
   * @memberof ProyectsComponent
   */
  ngOnInit(): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 0;
    pageRequest.size = 10;
    this.findRequest.pageRequest = pageRequest;
    this.projectService.find(this.findRequest).subscribe((data) => {
      this.allProjectFiltered = data;
      this.loadedProjects = true;
    });

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
        this.echartOptions = HelperGraphics.configChartTree([treeData]);
      });

    }


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
   * @param {number} i
   * @memberof ProyectsComponent
   */
  allprojectsFilteredPageChanged(i: number): void {
    this.findRequest.pageRequest.page = i - 1;
    this.findRequest.pageRequest.size = this.allProjectFiltered.size;
    this.projectService.find(this.findRequest).subscribe((data) => {
      this.allProjectFiltered = data;
      this.loadedProjects = true;
    });
  }


  /**
   *
   *
   * @param {number} i
   * @memberof ProyectsComponent
   */
  allprojectsFilteredSizeChanged(i: number): void {

    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = this.allProjectFiltered.number;
    pageRequest.size = i;
    pageRequest.direction = this.allProjectFiltered.direction;
    this.findRequest.pageRequest = pageRequest;
    this.projectService.find(this.findRequest).subscribe((data) => {
      this.allProjectFiltered = data;
      this.loadedProjects = true;
    });
  }


  /**
   *
   *
   * @param {PageRequest} pageRequest
   * @memberof ProyectsComponent
   */
  allprojectsFilteredSortChanged(pageRequest: PageRequest) {
    const newPageRequest: PageRequest = new PageRequest();
    newPageRequest.page = this.allProjectFiltered.number;
    newPageRequest.size = this.allProjectFiltered.size;
    newPageRequest.property = pageRequest.property;
    newPageRequest.direction = pageRequest.direction;
    this.findRequest.pageRequest = pageRequest;
    this.projectService.find(this.findRequest).subscribe((data) => {
      this.allProjectFiltered = data;
      this.loadedProjects = true;
    });
  }



  /**
   *
   *
   * @memberof ProyectsComponent
   */
  filterProjects() {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 0;
    pageRequest.size = this.allProjectFiltered.size;
    this.findRequest.pageRequest = pageRequest;
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
        this.allProjectFiltered = data;
        this.loadedProjects = true;
      });
    }, 0);
  }

}
