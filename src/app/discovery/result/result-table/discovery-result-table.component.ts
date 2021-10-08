import { Component, Input, OnChanges } from '@angular/core';
import { Order, Direction } from 'src/app/_helpers/search';

@Component({
  selector: 'app-discovery-result-table',
  templateUrl: './discovery-result-table.component.html',
  styleUrls: ['./discovery-result-table.component.css', './discovery-result-table.component.scss']
})
export class DiscoveryResultTableComponent implements OnChanges {

  @Input() responseData: any;

  table: DiscoveryResultTable = new DiscoveryResultTable();

  ngOnChanges(changes: any) {
    if (changes.responseData) {
      this.table.init(this.responseData);
    }
  }

}

export class DiscoveryResultTable {
  initData: Array<DiscoveryResultItem> = [];
  data: Array<DiscoveryResultItem> = [];
  sorting: Record<string, Order> = {};
  currentSort: Order[] = [];
  filter: { title?: string, automatics?: ('true' | 'false'), manuals?: ('true' | 'false') } = {};
  itemExpanded: DiscoveryResultItem;

  init(responseData?: { response: { results: Array<DiscoveryResultItem> } }): void {
    this.initData = [];
    if (responseData && responseData.response && responseData.response.results) {
      this.initData = responseData.response.results;
    }
    this.data = [];
    this.currentSort = [];
    this.initSorting('attributes.title', 'automatics', 'manuals');
    this.filter = {};
    this.filterChanged();
  }

  private initSorting(...properties: Array<string>): void {
    this.sorting = {};
    properties.forEach((p: string) => {
      const order = new Order();
      order.property = p;
      this.sorting[p] = order;
    });
  }

  sort(property: string): void {

    const propertySorting: Order = this.sorting[property];
    if (propertySorting.direction === Direction.DESC) {
      propertySorting.direction = Direction.ASC;
    } else {
      propertySorting.direction = Direction.DESC;
    }

    this.currentSort = this.currentSort.filter((s: Order) => {
      return s.property !== propertySorting.property;
    });
    this.currentSort.push(propertySorting);

    this.initData.sort(this.sortList(propertySorting));

    this.filterChanged();
  }

  private sortList(sorting: Order): (a: DiscoveryResultItem, b: DiscoveryResultItem) => number {
    const sortOrder = sorting.direction === Direction.DESC ? -1 : 1;
    const property = sorting.property;
    return (item1: DiscoveryResultItem, item2: DiscoveryResultItem) => {
      const val1 = this.getNestedProperty(item1, property);
      const val2 = this.getNestedProperty(item2, property);
      const result = (!val1 && !val2 ? 0 : ((!val1 || val1 > val2) ? 1 : (!val2 || val1 < val2) ? -1 : 0));
      return result * sortOrder;
    };
  }

  private getNestedProperty(obj: any, path: string): any {
    const arr = path.split('.');
    while (arr.length && obj) {
      obj = obj[arr.shift()];
    }
    return obj;
  }

  getSortIcon(property: string): string {
    let result = 'fa fa-caret-up-down';
    const propertySorting: Order = this.sorting[property];
    if (propertySorting.direction === Direction.DESC) {
      result = 'fa fa-caret-down';
    } else if (propertySorting.direction === Direction.ASC) {
      result = 'fa fa-caret-up';
    }
    return result;
  }

  onFilterClick(event: any): void {
    event.stopPropagation();
    event.preventDefault();
  }

  filterChanged(): void {

    const titleRegExp = this.createSearchRegExp(this.filter.title);

    this.data = this.initData.filter((item: DiscoveryResultItem) => {
      let result = true;
      if ((this.filter.automatics === 'true' && !item.automatics.length) || (this.filter.automatics === 'false' && item.automatics.length)) {
        result = false;
      }
      if ((this.filter.manuals === 'true' && !item.manuals.length) || (this.filter.manuals === 'false' && item.manuals.length)) {
        result = false;
      }
      if (titleRegExp && !titleRegExp.test(item.attributes.title)) {
        result = false;
      }
      return result;
    });
  }

  private createSearchRegExp(value: string): RegExp {
    let searchRegexp: RegExp = null;
    if (value != null && value.length) {
      const escaped = value.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
      searchRegexp = new RegExp('^.*' + escaped + '.*$', 'i');
    }
    return searchRegexp;
  }

  toggleItem(item: DiscoveryResultItem): void {
    this.itemExpanded = this.isItemExpanded(item) ? null : item;
  }

  isItemExpanded(item: DiscoveryResultItem): boolean {
    return this.itemExpanded === item;
  }


}

export class DiscoveryResultItem {
  attributes: { title?: string };
  automatics: Array<any>;
  manuals: Array<any>;
}