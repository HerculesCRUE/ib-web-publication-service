import { Component, Input, OnInit } from '@angular/core';
import { Helper } from 'src/app/_helpers/utils';
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
      this.echartOptions = {
        title: {
          text: 'Núm. Universidades [Sello de Calidad]',
          left: 'center',
        },
        color: ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          type: 'plain',
          orient: 'horizontal',
          left: "left",
          top: 30,
          bottom: 0,
          data: data.legendData,
          textStyle: {
            fontFamily: "Poppins"
          },
          color: '#333',
          selected: data.selected,
        },
        series: [
          {
            name: 'Sello de Calidad',
            type: 'pie',
            top: '10%',
            radius: '55%',
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
    });


  }

}
