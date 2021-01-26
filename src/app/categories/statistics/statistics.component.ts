import { Component, OnInit } from '@angular/core';
import { latLng, tileLayer } from 'leaflet';
import { HelperGraphics } from 'src/app/_helpers/helperGraphics';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html'
})
export class StatisticsComponent implements OnInit {
  echartOptions2: any;
  options: any;
  constructor() { }

  ngOnInit(): void {
    const treeData = HelperGraphics.returnSquareData();
    this.echartOptions2 = HelperGraphics.configChartTree(treeData);
    // leaflet map
    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
      zoom: 16,
      center: latLng(43.53573, -5.66152),
    };
  }

}
