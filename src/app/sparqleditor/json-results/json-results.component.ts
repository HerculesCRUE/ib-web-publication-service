import { Component, Input, AfterViewChecked, ChangeDetectorRef } from '@angular/core';

/**
 * JsonResultsComponent
 *
 * @export
 * @class JsonResultsComponent
 * @implements {OnInit}
 * @implements {AfterViewChecked}
 * 
 */
@Component({
  selector: 'app-json-results',
  templateUrl: './json-results.component.html'
})
export class JsonResultsComponent implements AfterViewChecked {
  _data; // private property _data
  _dataToShow;

  // use getter setter to define the property
  get data(): any {
    return this._data;
  }

  /**
   * data
   *
   * @memberof JsonResultsComponent
   */
  @Input()
  set data(val: any) {
    this._data = val;
  }

  constructor(private cd: ChangeDetectorRef) { }

  ngAfterViewChecked() {
    /* Looks for changes on this component and its children, after the wizardSteps changed */
    this.cd.detectChanges();
  }

}
