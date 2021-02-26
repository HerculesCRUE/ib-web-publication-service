
import { Component, Input, OnInit } from '@angular/core';
import { HelperGraphics } from 'src/app/_helpers/helperGraphics';

@Component({
  selector: 'app-chart-results',
  templateUrl: './chart-results.component.html',
  styleUrls: ['./chart-results.component.css']
})
export class ChartResultsComponent implements OnInit {
  @Input()
  data: any[];
  @Input()
  labels: String[];
  @Input()
  type: String;

  echartOptions: any;

  constructor() { }
  ngOnInit(): void {
    if (this.type == 'bar') {
      this.echartOptions = HelperGraphics.configSimpleChartBar(this.labels, this.data);
    } else if (this.type == 'line') {
      this.echartOptions = HelperGraphics.configChartLine(this.labels, this.data);
    } else if (this.type == 'bubble') {
      this.echartOptions = HelperGraphics.configChartBubble(this.labels, this.data);
    } else if (this.type == 'sector') {
      this.echartOptions = HelperGraphics.configSimpleChartPie(this.labels, this.data);
    }
  }

}
