import { Component, OnInit } from '@angular/core';
import { latLng, tileLayer } from 'leaflet';
import { HelperGraphics } from 'src/app/_helpers/helperGraphics';
import { Graphic } from 'src/app/_models/graphic';
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
    this.statisticService.projectByClassification().subscribe(data => {
      this.echartOptions = HelperGraphics.configChartPie(this.transformData(data), '');
    });
    this.statisticService.articlesByPublishedIn().subscribe(treeData => {
      this.echartOptions2 = HelperGraphics.configChartPie(this.transformDataArticle(treeData), '');
    });

  }

  transformData(data: Array<Graphic>) {
    const result = [];
    if (data.length > 0) {
      data.forEach(element => {
        result.push({ name: element.projectClassification, value: element.count });
      });
    }
    return {
      seriesData: result
    };

  }

  transformDataArticle(data: Array<Graphic>) {
    const result = [];
    if (data && data.length > 1) {
      data.forEach(element => {
        result.push({ name: element.publishedIn, value: element.count });
      });
    }
    return {
      seriesData: result
    };

  }




  doSomethingOnScroll($event) {

  }

  makeDataTree(data: Array<GraphicModelTree>) {
    const result = [];
    if (data.length > 0) {
      data.forEach(element => {
        result.push({ name: element.modality, value: element.count });
      });
    }
    return result;

  }
}
