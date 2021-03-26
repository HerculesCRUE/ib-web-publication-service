import { Component, OnInit } from '@angular/core';
import { latLng, tileLayer } from 'leaflet';
import { HelperGraphics } from 'src/app/_helpers/helperGraphics';
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
  /**
   *
   *
   * @type {*}
   * @memberof StatisticsComponent
   */
  options: any;
  constructor(private statisticService: StatisticService) { }

  ngOnInit(): void {

    let treeData;
    this.statisticService.topPatents().subscribe(data => {
      treeData = data;
      this.echartOptions2 = HelperGraphics.configChartTree(treeData);
    })

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
}
