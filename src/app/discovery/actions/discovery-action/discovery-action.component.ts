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
  dataIsLoaded = false;
  responseIsReady = false;
  responseData: any;
  resultsList: any;
  requestCodes: Array<object>

  constructor(private discoveryService: DiscoveryService, private loginService: LoginService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.bodyRequest = JSON.stringify({ "id": 40372, "title": "Fisiología del comportamiento", "date": "2006", "endPage": 41, "publishedIn": "BIOTECNOLOGIA DE LA REPRODUCCION PORCINAPORCI", "startPage": 24 }, null, 2)
    this.currentUser = this.loginService.getCurrentUser();
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
