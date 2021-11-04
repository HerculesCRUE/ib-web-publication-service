
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
  labels: string[];
  @Input()
  type: string;
  @Input()
  options: any;

  echartOptions: any;

  ngOnInit(): void {
    if (this.type == 'bar') {
      this.echartOptions = this.options ? this.options : HelperGraphics.configSimpleChartBar(this.labels, this.data);
    } else if (this.type == 'line') {
      this.echartOptions = this.options ? this.options : HelperGraphics.configChartLine(this.labels, this.data);
    } else if (this.type == 'bubble') {
      this.echartOptions = this.options ? this.options : HelperGraphics.configChartBubble(this.labels, this.data);
    } else if (this.type == 'sector') {
      this.echartOptions = this.options ? this.options : HelperGraphics.configSimpleChartPie(this.labels, this.data);
    }
  }

}
