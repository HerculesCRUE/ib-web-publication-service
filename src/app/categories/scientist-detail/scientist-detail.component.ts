import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Graphic } from 'src/app/_models/graphic';
import { PersonDetail } from 'src/app/_models/personDetail';
import { GraphicService } from 'src/app/_services/graphic.service';
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
  scientist: PersonDetail = new PersonDetail();
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
  constructor(private researchStaffService: ResearchStaffService, private rutaActiva: ActivatedRoute,
    private graphicServcice: GraphicService) { }

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

  }


  returnLastValue(url) {
    const typeFromURL = url.split('/');
    return typeFromURL.pop();
  }

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
