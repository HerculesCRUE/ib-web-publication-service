import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { BindingValue, SparqlResults } from 'src/app/_models/sparql';

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
  echartData: any[];
  echartLabels: String[];

  activeCharts: boolean = false;

  constructor(private cd: ChangeDetectorRef) {

  }
  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }
  ngOnInit(): void {

  }



  // Set default values after load the view
  ngAfterViewInit(): void {



  }

  // Set values when load the view
  ngOnChanges(changes: SimpleChanges) {

    this.enableGraphics();
    this.activeTab = 'table';
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

    if (!!this.data && this.data.head.vars.length == 2 && !!this.data.results.bindings && this.data.results.bindings.length > 0) {
      const firstResult = this.data.results.bindings[0];

      if (this.isText(firstResult[this.data.head.vars[0]]) || this.isText(firstResult[this.data.head.vars[1]])) {
        if (this.isText(firstResult[this.data.head.vars[0]]) && this.isNumeric(firstResult[this.data.head.vars[1]])) {
          this.activeCharts = true;
          this.echartLabels = this.data.results.bindings.map((a) => a[this.data.head.vars[0]].value);
          this.echartData = this.data.results.bindings.map((a) => a[this.data.head.vars[1]].value);
        } else if (this.isText(firstResult[this.data.head.vars[1]]) && this.isNumeric(firstResult[this.data.head.vars[0]])) {
          this.activeCharts = true;
          this.echartLabels = this.data.results.bindings.map((a) => a[this.data.head.vars[1]].value);
          this.echartData = this.data.results.bindings.map((a) => a[this.data.head.vars[0]].value);
        }
      }
    }
  }

  private isText(binding: BindingValue): boolean {
    return binding.type == "literal" && binding.hasOwnProperty('xml:lang');
  }

  private isNumeric(binding: BindingValue): boolean {
    if (binding.type == "literal" && binding.hasOwnProperty('datatype')) {
      if (binding.datatype.includes('integer') || binding.datatype.includes('decimal') || binding.datatype.includes('float') || binding.datatype.includes('double')) {
        return true;
      }
    }
    return false;
  }

}
