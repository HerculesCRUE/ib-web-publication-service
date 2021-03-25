import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelperGraphics } from 'src/app/_helpers/helperGraphics';
import { Person } from 'src/app/_models/person';
import { SeriesBarData } from 'src/app/_models/seriesBarData';
import { ResearchStaffService } from 'src/app/_services/research-staff.service';

@Component({
  selector: 'app-scientist-detail',
  templateUrl: './scientist-detail.component.html'
})
export class ScientistDetailComponent implements OnInit {
  /**
   *
   *
   * @type {*}
   * @memberof ScientistDetailComponent
   */
  scientist: Person = new Person();
  /**
   *
   *
   * @memberof ScientistDetailComponent
   */
  loadingData = false;
  /**
   *
   *
   * @type {*}
   * @memberof ScientistDetailComponent
   */
  echartOptions: any;
  /**
   *
   *
   * @type {string}
   * @memberof ScientistDetailComponent
   */
  activeTab: string;
  scientificId: string;
  constructor(private researchStaffService: ResearchStaffService, private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeTab = 'acction-inves';
    const xAxisData: Array<string> = [];
    const data1: Array<any> = [];
    const data2: Array<any> = [];
    const id = this.rutaActiva.snapshot.params.id;
    this.scientificId = id;
    this.researchStaffService.getPerson(id).subscribe(data => {
      this.scientist = data;
    });
    for (let i = 0; i < 100; i++) {
      xAxisData.push(`category${i}`);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }
    const legend = ['Proyectos', 'Tesis dirigidas/ codirigidas', 'Congresos', 'Acciones científicas'];
    const barData: Array<SeriesBarData> = [{
      name: 'Proyectos',
      type: 'bar',
      data: data1,
      animationDelay: (idx) => idx * 10,
    },
    {
      name: 'Tesis dirigidas/ codirigidas',
      type: 'bar',
      data: data2,
      animationDelay: (idx) => idx * 10 + 100,
    }, {
      name: 'Congresos',
      type: 'bar',
      data: data1,
      animationDelay: (idx) => idx * 9,
    },
    {
      name: 'Acciones científicas',
      type: 'bar',
      data: data2,
      animationDelay: (idx) => idx * 11 + 100,
    }];
    this.echartOptions = HelperGraphics.configChartBar(xAxisData, barData, legend);
  }

  /**
   *
   *
   * @param {string} tabName
   * @memberof ScientistDetailComponent
   */
  changeTab(tabName: string) {
    this.activeTab = tabName;
  }

}
