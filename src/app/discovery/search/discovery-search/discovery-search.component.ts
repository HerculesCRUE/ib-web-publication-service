import { Component, OnInit } from '@angular/core';
import { FindRequest } from 'src/app/_helpers/search';
import { User } from 'src/app/_models/user';
import { DiscoveryService } from 'src/app/_services/discovery/discovery.service';
import { LoginService } from 'src/app/_services/login.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-discovery-search',
  templateUrl: './discovery-search.component.html',
  styleUrls: ['./discovery-search.component.css']
})
export class DiscoverySearchComponent implements OnInit {

  nodes = {};
  searchRequest: FindRequest = new FindRequest();
  currentUser: User;
  actionSearch: string;
  objetsList: Array<string>;
  dataIsLoaded = false;
  responseIsReady = false;
  responseData: any;

  constructor(private discoveryService: DiscoveryService, private loginService: LoginService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.currentUser = this.loginService.getCurrentUser();
    this.searchRequest.filter.userId = 'front-request:' + ((this.currentUser) ? 'this.currentUser.id' : 'anonimus');
    this.searchRequest.filter.applyDelta = true;
    this.searchRequest.filter.doSynchronous = true;
    this.searchRequest.filter.linkEntities = false;
    this.searchRequest.filter.propague_in_kafka = true;
    this.loadNodesList();
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
      this.objetsList.sort();
    });
  }

  onActionSelected() {
    console.log('onActionSelected', this.actionSearch);
  }

  onNodeSelected() {
    this.objetsList = [];
  }

  onTripleStoreSelected() {
    this.objetsList = [];
    this.searchRequest.filter.className = undefined;
    if (this.searchRequest.filter.tripleStore) {
      this.loadObjects();
    }
  }


  launchSearch() {
    this.responseIsReady = false;
    if (this.actionSearch === 'class') {
      this.spinner.show();
      this.discoveryService.doRequestFindSimilaritiesByClass(this.searchRequest).then((data) => {
        console.log("Promise resolved with: " + JSON.stringify(data));
        this.responseIsReady = true;
        this.responseData = data;
        this.searchRequest.filter.node = undefined;
        this.searchRequest.filter.tripleStore = undefined;
        this.searchRequest.filter.className = undefined;
        this.spinner.hide();
      }, (error) => {
        console.log("Promise rejected with " + JSON.stringify(error));
        this.responseIsReady = true;
        this.spinner.hide();
      });
    } else if (this.actionSearch === 'instance') {

    } else if (this.actionSearch === 'lod') {

    }
  }

}
