import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.component.html'
})
export class DiscoveryComponent implements OnInit {

  /**
  *
  * current active tab
  * @type {string}
  * @memberof DiscoveryComponent
  */
  activeTab: string;

  constructor() { }

  ngOnInit(): void {
    this.activeTab = 'control-tab';
    // this.statisticService.projectByClassification().subscribe(data => {
    //   this.echartOptions = HelperGraphics.configChartPie(this.transformData(data), '');
    // });
    // this.statisticService.articlesByPublishedIn().subscribe(treeData => {
    //   this.echartOptions2 = HelperGraphics.configChartPie(this.transformDataArticle(treeData), '');
    // });

  }

  changeTab(tabName: string) {
    console.log('onChangeTab', tabName);
    this.activeTab = tabName;
  }

  // transformData(data: Array<Graphic>) {
  //   const result = [];
  //   if (data.length > 0) {
  //     data.forEach(element => {
  //       result.push({ name: element.projectClassification ? element.projectClassification : 'Sin definir', value: element.count });
  //     });
  //   }
  //   return {
  //     seriesData: result
  //   };

  // }

  // transformDataArticle(data: Array<Graphic>) {
  //   const result = [];
  //   if (data && data.length > 1) {
  //     data.forEach(element => {
  //       result.push({ name: element.publishedIn ? element.publishedIn : 'Sin definir', value: element.count });
  //     });
  //   }
  //   return {
  //     seriesData: result
  //   };

  // }


  // makeDataTree(data: Array<GraphicModelTree>) {
  //   const result = [];
  //   if (data.length > 0) {
  //     data.forEach(element => {
  //       result.push({ name: element.modality ? element.modality : 'Sin definir', value: element.count });
  //     });
  //   }
  //   return result;

  // }
}
