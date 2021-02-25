import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { HelperGraphics } from 'src/app/_helpers/helperGraphics';
import { Helper } from 'src/app/_helpers/utils';
import { BindingValue, SparqlResults } from 'src/app/_models/sparql';
import { TranslateHelperService } from 'src/app/_services/translate-helper.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  inputs: ['data', 'errorMessage'],
})
export class ResultsComponent implements AfterViewInit, OnChanges, OnInit, AfterViewChecked {

  activeTab: string = 'table';

  data: SparqlResults = null;
  errorMessage = null;

  echartOptions: any;

  activeCharts: boolean = false;

  constructor(private cd: ChangeDetectorRef) {

  }
  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }
  ngOnInit(): void {
    const xAxisData: Array<string> = [];
    const data1: Array<any> = [];
    const data2: Array<any> = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    const data = Helper.genData(2);
    this.echartOptions = HelperGraphics.configChartPie(data, 'DATA 1', 'DATA2');
  }



  // Set default values after load the view
  ngAfterViewInit(): void {

    this.data = { "head": { "vars": ["id", "amount"] }, "results": { "bindings": [{ "id": { "type": "literal", "xml:lang": "es", "value": "RFA-2015-20527" }, "amount": { "type": "literal", "datatype": "http://loquesea#integer'", "value": "229,34" } }, { "id": { "type": "literal", "xml:lang": "es", "value": "RFA-2015-18538" }, "amount": { "type": "literal", "datatype": "http://loquesea#integer'", "value": "305,0" } }, { "id": { "type": "literal", "xml:lang": "es", "value": "RFA-2015-18537" }, "amount": { "type": "literal", "datatype": "http://loquesea#integer'", "value": "138,86" } }, { "id": { "type": "literal", "xml:lang": "es", "value": "RFA-2015-1691" }, "amount": { "type": "literal", "datatype": "http://loquesea#integer'", "value": "117,99" } }, { "id": { "type": "literal", "xml:lang": "es", "value": "RFA-2015-10595" }, "amount": { "type": "literal", "datatype": "http://loquesea#integer'", "value": "96,0" } }] } };

    if (!!this.data && this.enableGraphics) {
      this.activeCharts = true;
    }


  }

  // Set values when load the view
  ngOnChanges(changes: SimpleChanges) {
    // this.doSomething(changes.categoryId.currentValue);
    // if (!!this.resultsTab) {
    //   if (!!this.errorMessage || !this.data) {
    //     this.resultsTab.tabs[0].active = true;
    //     this.resultsTab.tabs.forEach((tab) => {
    //       tab.disabled = true;
    //     });
    //   } else {
    //     // _TODO: Enable tabs depending of the data
    //     this.resultsTab.tabs[0].disabled = false;
    //     this.resultsTab.tabs[1].disabled = false;
    //   }
    // }
  }

  /**
   *
   *
   * @param {string} tab
   * @memberof ResultsComponent
   */
  changeTab(tab: string, disabled: boolean) {
    if (!disabled) {
      this.activeTab = tab;
    }

  }


  /*
   ************************************
   ********* PRIVATE FUNCTONS *********
   ************************************
  */
  private enableGraphics() {
    this.activeCharts = false;

    if (this.data.head.vars.length == 2 && !!this.data.results.bindings && this.data.results.bindings.length > 0) {
      const firstResult = this.data.results.bindings[0];

      if (this.isText(firstResult[this.data.head.vars[0]]) || this.isText(firstResult[this.data.head.vars[1]])) {
        if (this.isText(firstResult[this.data.head.vars[0]]) && this.isNumeric(firstResult[this.data.head.vars[1]])) {
          this.activeCharts = true;
        } else if (this.isText(firstResult[this.data.head.vars[1]]) && this.isNumeric(firstResult[this.data.head.vars[0]])) {
          this.activeCharts = true;
        }
      }
    }

  }

  private isText(binding: BindingValue): boolean {
    return binding.type == "literal" && binding.hasOwnProperty('xml:lang');
  }

  private isNumeric(binding: BindingValue): boolean {
    if (binding.type == "literal" && binding.hasOwnProperty('datatype')) {
      if (binding.datatype.includes('decimal')) {
        if (binding.datatype.includes('integer') || binding.datatype.includes('decimal') || binding.datatype.includes('float') || binding.datatype.includes('double')) {
          return true;
        }
      }
    }
    return false;
  }

}
