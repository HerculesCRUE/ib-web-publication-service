import { Component, OnInit } from '@angular/core';
import { HelperGraphics } from 'src/app/_helpers/helperGraphics';
import { FindRequest } from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';
import { Graphic } from 'src/app/_models/graphic';
import { GraphicService } from 'src/app/_services/graphic.service';


@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html'
})
export class AreasComponent implements OnInit {

  normalTree = true;
  /**
   *
   *
   * @type {FindRequest}
   * @memberof AreasComponent
   */
  findRequest: FindRequest = new FindRequest();
  /**
   *
   *
   * @type {*}
   * @memberof AreasComponent
   */
  echartOptions: any;
  /**
   *
   *  get years for select
   * @memberof AreasComponent
   */
  yearsForSelect = Helper.getYears();
  /**
   *
   *
   * @memberof AreasComponent
   */
  yearSelected;
  /**
   *
   *
   * @memberof AreasComponent
   */
  secondYearSelected;
  /**
   *
   *
   * @type {boolean}
   * @memberof AreasComponent
   */
  loaded: boolean;
  /**
   *
   *
   * @type {boolean}
   * @memberof AreasComponent
   */
  loaded2: boolean;
  constructor(private graphicService: GraphicService) { }

  ngOnInit(): void {
    this.yearSelected = new Date().getFullYear();
    this.secondYearSelected = new Date().getFullYear();
    this.graphicService.projectAreasPerYear(this.yearSelected).subscribe(data => {
      this.loaded = true;
      this.echartOptions = HelperGraphics.configChartPie(this.transformData(data), 'Num, de grupos de investigación por area');
    });


  }

  transformData(data: Array<Graphic>) {

    const result = [];
    if (data.length > 1) {
      data.forEach(element => {
        result.push({ name: element.hasKnowledgeAreatitle, value: element.count });
      });
    }
    return {
      seriesData: result
    };

  }




}
