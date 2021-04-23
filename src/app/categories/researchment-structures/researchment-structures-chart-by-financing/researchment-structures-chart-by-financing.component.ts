import { Component, Input, OnInit } from '@angular/core';
import { HelperGraphics } from 'src/app/_helpers/helperGraphics';
import { Helper } from 'src/app/_helpers/utils';
import { Graphic } from 'src/app/_models/graphic';
import { GraphicService } from 'src/app/_services/graphic.service';

@Component({
  selector: 'app-sector-chart',
  templateUrl: './researchment-structures-chart-by-financing.component.html'
})
export class ResearchmentStructuresByFinancingComponent implements OnInit {

  @Input()
  data: any;


  echartOptions: any;

  constructor(private graphicServcice: GraphicService) { }

  ngOnInit(): void {
    // Gráficas
    let xAxisData: Array<string> = [];
    let data1: Array<any> = [];
    let data2: Array<any> = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push(`category${i}`);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.graphicServcice.universityFinancing().subscribe((data: any) => {
      this.echartOptions = HelperGraphics.configChartPie(this.transformData(data), 'Num. estructuras por tipo');
    });


  }

  /**
   *
   *
   * @param {*} url
   * @return {*} 
   * @memberof ResearchmentStructuresByFinancingComponent
   */
  returnLastValue(url) {
    const typeFromURL = url.split('/');
    return typeFromURL.pop();
  }
  /**
   *
   *
   * @param {Array<Graphic>} data
   * @return {*} 
   * @memberof ResearchmentStructuresByFinancingComponent
   */
  transformData(data: Array<Graphic>) {

    const result = [];
    if (data.length > 0) {
      data.forEach(element => {
        result.push({ name: this.returnLastValue(element.type), value: element.count });
      });
    }
    return {
      seriesData: result
    };

  }

}
