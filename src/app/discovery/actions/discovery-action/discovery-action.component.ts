import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FindRequest } from 'src/app/_helpers/search';
import { User } from 'src/app/_models/user';
import { DiscoveryService } from 'src/app/_services/discovery/discovery.service';
import { LoginService } from 'src/app/_services/login.service';

@Component({
  selector: 'app-discovery-action',
  templateUrl: './discovery-action.component.html',
  styleUrls: ['./discovery-action.component.css']
})
export class DiscoveryActionComponent implements OnInit {

  nodes = {};
  searchRequest: FindRequest = new FindRequest();
  bodyRequest: any;
  currentUser: User;
  actionSearch: string;
  objetsList: Array<string>;
  objetsLodList: any;
  dataIsLoaded = false;
  responseIsReady = false;
  responseData: any;

  constructor(private discoveryService: DiscoveryService, private loginService: LoginService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.bodyRequest = JSON.stringify({ "id": 40372, "title": "Fisiología del comportamiento", "date": "2006", "endPage": 41, "publishedIn": "BIOTECNOLOGIA DE LA REPRODUCCION PORCINAPORCI", "startPage": 24 }, null, 2)
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
      console.log('nodthis.objetsListes', this.objetsList)
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

  }

}
