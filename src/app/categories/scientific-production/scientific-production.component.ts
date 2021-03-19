import { Component, OnInit } from '@angular/core';

/**
 *
 *
 * @export
 * @class ScientificProductionComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-scientific-production',
  templateUrl: './scientific-production.component.html'
})
export class ScientificProductionComponent implements OnInit {
  /**
   *
   *
   * @type {boolean}
   * @memberof ScientificProductionComponent
   */
  normalTree = true;
  /**
   *
   *
   * @type {string}
   * @memberof ScientificProductionComponent
   */
  activeTab: string;
  constructor() { }

  ngOnInit(): void {
    this.activeTab = 'scientific-publications';
  }
  /**
   *
   *
   * @param {string} tabName
   * @memberof ScientificProductionComponent
   */
  changeTab(tabName: string) {
    this.activeTab = tabName;
  }

}
