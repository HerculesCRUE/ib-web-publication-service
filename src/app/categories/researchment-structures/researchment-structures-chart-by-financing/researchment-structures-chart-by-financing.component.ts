import { Component, Input, OnInit } from '@angular/core';
import { HelperGraphics } from 'src/app/_helpers/helperGraphics';
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
