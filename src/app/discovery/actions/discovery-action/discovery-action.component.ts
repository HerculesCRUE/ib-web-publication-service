import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FindRequest, Direction, Order } from 'src/app/_helpers/search';
import { User } from 'src/app/_models/user';
import { DiscoveryService } from 'src/app/_services/discovery/discovery.service';
import { LoginService } from 'src/app/_services/login.service';

@Component({
  selector: 'app-discovery-action',
  templateUrl: './discovery-action.component.html',
  styleUrls: ['./discovery-action.component.css', './discovery-action.component.scss']
})
export class DiscoveryActionComponent implements OnInit {

  nodes = {};
  searchRequest: FindRequest = new FindRequest();
  bodyRequest: any;
  currentUser: User;
  actionSearch: string;
  objetsList: Array<string>;
  dataIsLoaded = false;
  responseIsReady = false;
  responseData: any;
  resultsList: any;
  requestCodes: Array<object>
  isAdmin = false;

  table: DiscoveryResultTable = new DiscoveryResultTable();

  constructor(private discoveryService: DiscoveryService, private loginService: LoginService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.bodyRequest = JSON.stringify({ "id": 40372, "title": "Fisiología del comportamiento", "date": "2006", "endPage": 41, "publishedIn": "BIOTECNOLOGIA DE LA REPRODUCCION PORCINAPORCI", "startPage": 24 }, null, 2)
    this.loginService.keycloakIsAdmin().subscribe(res => { this.isAdmin = res });
    this.searchRequest.filter.applyDelta = true;
    this.searchRequest.filter.doSynchronous = true;
    this.searchRequest.filter.linkEntities = false;
    this.searchRequest.filter.propague_in_kafka = true;
    this.loadResultsList();
    this.loadNodesList();
  }

  loadResultsList() {
    this.resultsList = {};
    this.searchRequest.filter.userId = 'front-request:' + ((this.currentUser) ? 'this.currentUser.id' : 'anonimus');
    this.discoveryService.getResultListByUserId(this.searchRequest.filter.userId).then(data => {
      this.resultsList = data;
    });
  }

  loadNodesList() {
    this.nodes = {};
    this.dataIsLoaded = false;
    this.discoveryService.getNodesList(new FindRequest()).subscribe((nodes: Array<Object>) => {
      for (let i = 0; i < nodes.length; i++) {
        if (!(nodes[i]['name'] in nodes)) {
          this.nodes[nodes[i]['name']] = [];
          if (nodes[i]['services']) {
            for (let j = 0; j < nodes[i]['services'].length; j++) {
              if (nodes[i]['services'][j]['name'] === 'Federation') {
                for (let k = 0; k < nodes[i]['services'][j]['types'].length; k++) {
                  this.nodes[nodes[i]['name']].push(nodes[i]['services'][j]['types'][k]['name']);
                }
              }
            }
          }
        }
      }
      console.log('nodes', this.nodes)
      this.dataIsLoaded = true;
    });
  }

  loadObjects() {
    this.objetsList = [];
    this.discoveryService.getObjectList(this.searchRequest).subscribe((objects: Array<Object>) => {
      for (let i = 0; i < objects.length; i++) {
        this.objetsList.push(String(objects[i]).split("/").slice(-1)[0]);
      }
      console.log('nodthis.objetsListes', this.objetsList)
      this.objetsList.sort();
    });
  }

  onActionSelected() {
    this.searchRequest.filter = {};
    this.searchRequest.filter.userId = 'front-request:' + ((this.currentUser) ? 'this.currentUser.id' : 'anonimus');
  }

  onNodeSelected() {
    this.searchRequest.filter.requestType = undefined;
    this.searchRequest.filter.className = undefined;
    this.searchRequest.filter.requestCode = undefined;
    this.requestCodes = [];
  }

  onRequestTypeSelected() {
    this.searchRequest.filter.className = undefined;
    this.searchRequest.filter.requestCode = undefined;
    this.requestCodes = [];
  }

  onClassNameSelected() {
    this.requestCodes = this.resultsList[this.searchRequest.filter.requestType][this.searchRequest.filter.className];
  }

  launchSearch() {
    if (this.actionSearch === 'results') {
      this.spinner.show();
      this.discoveryService.getResult(this.searchRequest).then((data) => {
        this.responseIsReady = true;
        this.responseData = data;
        this.table.init(this.responseData);
        this.searchRequest.filter = {};
        this.searchRequest.filter.userId = 'front-request:' + ((this.currentUser) ? 'this.currentUser.id' : 'anonimus');
        this.requestCodes = [];
        this.spinner.hide();
      }, (error) => {
        this.responseIsReady = true;
        this.spinner.hide();
      });
    } else if (this.actionSearch === 'open') {
      this.spinner.show();
      this.discoveryService.getOpenResult(this.searchRequest).then((data) => {



        this.responseIsReady = true;
        this.responseData = {
          "response": {
            "node": this.searchRequest.filter.node,
            "tripleStore": this.searchRequest.filter.tripleStore,
            "status": "COMPLETED",
            "results": data
          }
        };
        this.table.init(this.responseData);
        console.log('response', this.responseData);
        this.searchRequest.filter = {};
        this.searchRequest.filter.userId = 'front-request:' + ((this.currentUser) ? 'this.currentUser.id' : 'anonimus');
        this.requestCodes = [];
        this.spinner.hide();
      }, (error) => {
        this.responseIsReady = true;
        this.spinner.hide();
      });
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