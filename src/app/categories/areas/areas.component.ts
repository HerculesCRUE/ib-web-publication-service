import { Component, OnInit } from '@angular/core';
import { HelperGraphics } from 'src/app/_helpers/helperGraphics';
import { FindRequest } from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';


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
  constructor() { }

  ngOnInit(): void {
    const xAxisData: Array<string> = [];
    const data1: Array<any> = [];
    const data2: Array<any> = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push(`category${i}`);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    const data = Helper.genData(2);
    this.echartOptions = HelperGraphics.configChartPie(data, 'DATA 1', 'DATA2');
    const treeData = HelperGraphics.returnSquareData();
    this.echartOptions2 = HelperGraphics.configChartTree(treeData);
  }

}
