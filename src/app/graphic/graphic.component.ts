import { Component, OnInit } from '@angular/core';
import { latLng, tileLayer } from 'leaflet';
import { HelperGraphics } from '../_helpers/helperGraphics';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html'
})
export class GraphicComponent implements OnInit {
  echartOptions: any;
  options: any;

  data: any;

  constructor() { }

  ngOnInit(): void {
    // bar chart
    let xAxisData: Array<string> = [];
    let data1: Array<any> = [];
    let data2: Array<any> = [];
    for (let i = 0; i < 100; i++) {
      xAxisData.push(`category${i}`);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }
    const seriesData = [
      {
        name: 'bar',
        type: 'bar',
        data: data1,
        animationDelay: (idx) => idx * 10,
      },
      {
        name: 'bar2',
        type: 'bar',
        data: data2,
        animationDelay: (idx) => idx * 10 + 100,
      },
    ];
    this.echartOptions = HelperGraphics.configChartBar(xAxisData, seriesData, ['bar', 'bar2']);

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

    this.data = {
      name: 'categoria',
      children: [
        {
          name: 'Antropología Social y Cultural',
          children: [
            {
              name: 'Etnología regional',
              children: [
                { name: 'Geografía humana y demografía', value: 3938 },
                {
                  name:
                    'Estructuras y cambios sociales, económicos y políticos',
                  value: 3812,
                },
                {
                  name:
                    'Métodos y técnicas de investigación en antropología social.',
                  value: 6714,
                },
                { name: 'Población y Sociedad', value: 743 },
              ],
            },
            {
              name: 'Estructura Social de España',
              children: [
                { name: 'Antropología de la religión', value: 3534 },
                {
                  name: 'Diferencias Culturales y Derechos humanos',
                  value: 5731,
                },
                { name: 'Antropología Política', value: 7840 },
                {
                  name:
                    'Acción colectiva y Cultura Popular en la Europa Moderna y Contemporánea',
                  value: 5914,
                },
                {
                  name: 'Epistemología de la Práctica Etnográfica',
                  value: 3416,
                },
              ],
            },
          ],
        },
        {
          name: 'Técnico de Laboratorio de Universidad',
          children: [
            { name: 'Biología Vegetal', value: 17010 },
            { name: 'Ecología', value: 5842 },
            {
              name: 'Geología',
              children: [
                { name: 'Zoología y Antropología Física.', value: 1983 },
                { name: 'Centro de Experimentación Animal', value: 2047 },
                { name: 'Microscopía Electrónica.', value: 1375 },
                { name: 'Instalación Radiactiva', value: 8746 },
              ],
            },
            { name: 'Química Analítica e Ingeniería Química.', value: 1041 },
            { name: 'Química Física.', value: 5176 },
            { name: 'Química Inorgánica.', value: 449 },
            { name: 'Química Orgánica.', value: 5593 },
          ],
        },
      ],
    };
  }
}
