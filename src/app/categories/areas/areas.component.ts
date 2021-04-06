import { Component, OnInit } from '@angular/core';
import { HelperGraphics } from 'src/app/_helpers/helperGraphics';
import { FindRequest } from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';
import { GraphicService } from 'src/app/_services/graphic.service';


@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html'
})
export class AreasComponent implements OnInit {

  normalTree = true;
  /**
   *
   *
   * @type {FindRequest}
   * @memberof AreasComponent
   */
  findRequest: FindRequest = new FindRequest();
  /**
   *
   *
   * @type {*}
   * @memberof AreasComponent
   */
  echartOptions: any;
  /**
   *
   *
   * @type {*}
   * @memberof AreasComponent
   */
  echartOptions2: any;
  /**
   *
   *  get years for select
   * @memberof AreasComponent
   */
  yearsForSelect = Helper.getYears();
  /**
   *
   *
   * @memberof AreasComponent
   */
  yearSelected;
  /**
   *
   *
   * @memberof AreasComponent
   */
  secondYearSelected;
  /**
   *
   *
   * @type {boolean}
   * @memberof AreasComponent
   */
  loaded: boolean;
  /**
   *
   *
   * @type {boolean}
   * @memberof AreasComponent
   */
  loaded2: boolean;
  constructor(private graphicService: GraphicService) { }

  ngOnInit(): void {
    this.yearSelected = new Date().getFullYear();
    this.secondYearSelected = new Date().getFullYear();
    this.graphicService.projectAreasPerYear(this.yearSelected).subscribe(data => {
      this.loaded = true;
      this.echartOptions = HelperGraphics.configChartPie(data, 'DATA 1', 'DATA2');
    });
    this.graphicService.AreasPerYear(this.secondYearSelected).subscribe(data => {
      this.loaded2 = true;
      this.echartOptions2 = HelperGraphics.configChartTree(data);
    });

  }


  /**
   *
   *
   * @memberof AreasComponent
   */
  changeYearChart() {
    this.loaded = false;
    setTimeout(() => {
      this.graphicService.projectAreasPerYear(this.yearSelected).subscribe(data => {
        this.loaded = true;
        this.echartOptions = HelperGraphics.configChartPie(data, 'DATA 1', 'DATA2');
      });
    }, 10);

  }

  /**
   *
   *
   * @memberof AreasComponent
   */
  changeYearSquareChart() {
    this.loaded2 = false;
    setTimeout(() => {
      this.graphicService.AreasPerYear(this.secondYearSelected).subscribe(data => {
        this.loaded2 = true;
        this.echartOptions2 = HelperGraphics.configChartTree(data);
      });
    }, 10);
  }

}
