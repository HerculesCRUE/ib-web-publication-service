
import { Component, OnInit } from '@angular/core';
import { HelperGraphics } from 'src/app/_helpers/helperGraphics';
import { Helper } from 'src/app/_helpers/utils';
import { SparqlResults } from 'src/app/_models/sparql';

@Component({
  selector: 'app-bar-chart-results',
  templateUrl: './bar-chart-results.component.html',
  styleUrls: ['./bar-chart-results.component.css']
})
export class BarChartResultsComponent implements OnInit {

  data: SparqlResults = null;

  echartOptions: any;

  constructor() { }
  ngOnInit(): void {
    const xAxisData: Array<string> = [];
    const data1: Array<any> = [];
    const data2: Array<any> = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    const data = Helper.genData(2);
    this.echartOptions = HelperGraphics.configChartPie(data, 'DATA 1', 'DATA2');
  }

}
