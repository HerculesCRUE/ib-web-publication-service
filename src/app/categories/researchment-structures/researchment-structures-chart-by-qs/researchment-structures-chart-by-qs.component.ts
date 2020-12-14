import { Component, Input, OnInit } from '@angular/core';
import { Helper } from 'src/app/_helpers/utils';

/**
 * ResearchmentStructuresComponent
 *
 * @export
 * @class Researchment Structures By Quality Seal Component
 * @implements {OnInit}
 */
@Component({
  selector: 'app-researchment-structures-chart-by-qs',
  templateUrl: './researchment-structures-chart-by-qs.component.html',
  styleUrls: ['./researchment-structures-chart-by-qs.component.css']
})
export class ResearchmentStructuresByQSComponent implements OnInit {

  @Input()
  data: any;


  echartOptions: any;

  constructor() { }

  ngOnInit(): void {
    // Gráficas
    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    const data = Helper.genData(2);

    this.echartOptions = {
      title: {
        text: 'Núm. Universidades [Financiación]',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        type: 'scroll',
        orient: 'horizontal',
        right: 10,
        top: 30,
        bottom: 0,
        data: data.legendData,

        selected: data.selected,
      },
      series: [
        {
          name: 'Financiación',
          type: 'pie',
          radius: '55%',
          center: ['40%', '50%'],
          data: data.seriesData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }


}
