import { Component, OnInit } from '@angular/core';
import { FindRequest } from 'src/app/_helpers/search';
import { DiscoveryService } from 'src/app/_services/discovery/discovery.service';
import { LoginService } from 'src/app/_services/login.service';

@Component({
  selector: 'app-discovery-control',
  templateUrl: './discovery-control.component.html',
  styleUrls: ['./discovery-control.component.css', './discovery-control.component.scss']
})
export class DiscoveryControlComponent implements OnInit {

  findRequest: FindRequest = new FindRequest();
  findRequestStats: FindRequest = new FindRequest();
  discoveryState: any;
  nodes = {};
  tripleSto: Array<string>;
  isLoadedState: boolean;
  isLoadedFiltersStats: boolean;
  isLoadedNodeOption: boolean;
  objetsList = [];
  objectStats: any;
  isAdmin = false;

  constructor(private discoveryService: DiscoveryService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.keycloakIsAdmin().subscribe(res => { this.isAdmin = res });
    this.loadDiscoveryState();
    this.loadNodesList();
  }

  loadDiscoveryState() {
    this.isLoadedState = false;
    this.discoveryService.getDiscoveryState(this.findRequest).subscribe(state => {
      this.discoveryState = state;
      this.isLoadedState = true;
    });
  }

  loadNodesList() {
    this.isLoadedFiltersStats = false;
    this.nodes = {};
    this.discoveryService.getNodesList(this.findRequest).subscribe((nodes: Array<Object>) => {
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
      this.isLoadedNodeOption = true;
    });
  }

  loadObjects() {
    this.objetsList = [];
    this.discoveryService.getObjectList(this.findRequestStats).subscribe((objects: Array<Object>) => {
      for (let i = 0; i < objects.length; i++) {
        this.objetsList.push(String(objects[i]).split("/").slice(-1)[0]);
      }
      this.objetsList.sort();
    });
  }

  loadObjectStats() {
    this.objectStats = undefined;
    this.discoveryService.getObjectStats(this.findRequestStats).subscribe(stats => {
      this.objectStats = stats;
      let accumulated = 0;
      for (let att in this.objectStats.stats.attributes) {
        accumulated += this.objectStats.stats.attributes[att];
      }
      this.objectStats.stats.attributesStats = []
      for (let att in this.objectStats.stats.attributes) {
        this.objectStats.stats.attributesStats.push({
          "name": att,
          "raltiveRatio": this.objectStats.stats.attributes[att],
          "absoluteRatio": this.objectStats.stats.attributes[att] / accumulated
        });
      }
    });
  }

  forceReloadData() {
    this.discoveryService.forceDataReload(this.findRequest).subscribe(state => {
      this.isLoadedState = false;
      this.loadDiscoveryState();
    });
  }

  getClassByState(state: string) {
    if (this.discoveryState.appState === 'INITIALIZED' || this.discoveryState.appState === 'UPLOAD_DATA') {
      return 'badge badge-success';
    } else if (this.discoveryState.appState === 'INITIALIZED_WITH_CACHED_DATA' || this.discoveryState.appState === 'CACHED_DATA') {
      return 'badge badge-warning';
    } else {
      return 'badge badge-danger';
    }
  }

  getStateText(state: string) {
    return 'discovery.' + state;
  }

  onNodeSelected() {
    this.objetsList = [];
    this.objectStats = undefined;
    this.findRequestStats.filter.tripleStore = 'Federation';
  }

  onTripleStoreSelected() {
    this.objetsList = [];
    this.objectStats = undefined;
    if (this.findRequestStats.filter.tripleStore) {
      this.loadObjects();
    }
  }

  onObjectSelected() {
    if (this.findRequestStats.filter.className) {
      this.loadObjectStats();
    }
  }

}
