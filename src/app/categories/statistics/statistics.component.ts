import { Component, OnInit } from '@angular/core';
import { latLng, tileLayer } from 'leaflet';
import { HelperGraphics } from 'src/app/_helpers/helperGraphics';
import { GraphicModelTree } from 'src/app/_models/graphicModelTree';
import { GraphicService } from 'src/app/_services/graphic.service';
import { StatisticService } from 'src/app/_services/statistic.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html'
})
export class StatisticsComponent implements OnInit {
  /**
   *
   *
   * @type {*}
   * @memberof StatisticsComponent
   */
  echartOptions2: any;
  echartOptions: any;
  /**
   *
   *
   * @type {*}
   * @memberof StatisticsComponent
   */
  options: any;
  constructor(private statisticService: StatisticService, private graphicServcice: GraphicService) { }

  ngOnInit(): void {


    this.statisticService.topPatents().subscribe(data => {
      this.echartOptions = HelperGraphics.configChartTree(data);
    });
    this.graphicServcice.projectInvestigation().subscribe(treeData => {
      this.echartOptions2 = HelperGraphics.configChartTree(this.makeDataTree(treeData));
    });
    // leaflet map
    this.options = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
      zoom: 16,
      center: latLng(43.53573, -5.66152),
    };
  }

  doSomethingOnScroll($event) {

  }

  makeDataTree(data: Array<GraphicModelTree>) {
    const result = [];
    if (data.length > 1) {
      data.forEach(element => {
        result.push({ name: element.modality, value: element.count });
      });
    }
    return result;

  }
}
