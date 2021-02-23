import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Binding, BindingValue, SparqlResults } from 'src/app/_models/sparql';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  inputs: ['data', 'errorMessage'],
})
export class ResultsComponent implements AfterViewInit, OnChanges, AfterViewChecked {
  @ViewChild('resultsTab', { static: false })
  // resultsTab: TabsetComponent;
  activeTab: string;

  data: SparqlResults = null;
  errorMessage = null;

  activeCharts: boolean = false;

  constructor(private cd: ChangeDetectorRef) {

  }


  ngAfterViewChecked() {
    /* Looks for changes on this component and its children, after the wizardSteps changed */

    if (!this.activeTab) {
      this.activeTab = 'table';
    }
    this.cd.detectChanges();

  }

  // Set default values after load the view
  ngAfterViewInit(): void {

    if (!!this.data && this.enableGraphics) {
      this.activeCharts = true;
    }
    // if (!!this.resultsTab) {
    //   if (!this.data) {
    //     this.resultsTab.tabs[0].active = true;
    //   }
    // }
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
      var firstResult = this.data.results.bindings[0];

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
