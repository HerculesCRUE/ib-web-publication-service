import { Component, OnInit } from '@angular/core';
import { FindRequest } from 'src/app/_helpers/search';
import { User } from 'src/app/_models/user';
import { DiscoveryService } from 'src/app/_services/discovery/discovery.service';
import { LoginService } from 'src/app/_services/login.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-discovery-search',
  templateUrl: './discovery-search.component.html',
  styleUrls: ['./discovery-search.component.css', './discovery-search.component.scss']
})
export class DiscoverySearchComponent implements OnInit {

  nodes = {};
  searchRequest: FindRequest = new FindRequest();
  bodyRequest: any;
  currentUser: string;
  actionSearch: string;
  objetsList: Array<string>;
  objetsLodList: any;
  dataIsLoaded = false;
  responseIsReady = false;
  responseData: any;

  constructor(private discoveryService: DiscoveryService, private loginService: LoginService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.bodyRequest = JSON.stringify({ "id": 40372, "title": "Fisiología del comportamiento", "date": "2006", "endPage": 41, "publishedIn": "BIOTECNOLOGIA DE LA REPRODUCCION PORCINAPORCI", "startPage": 24 }, null, 2)
    this.currentUser = localStorage.getItem('user_name');
    this.searchRequest.filter.userId = 'front-request:' + ((this.currentUser) ? this.currentUser : 'anonimus');
    this.searchRequest.filter.applyDelta = true;
    this.searchRequest.filter.doSynchronous = true;
    this.searchRequest.filter.linkEntities = false;
    this.searchRequest.filter.propague_in_kafka = true;
    this.loadNodesList();
    this.loadLodObjects();
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

  loadLodObjects() {
    this.objetsLodList = {};
    this.objetsLodList['SCOPUS'] = ['Article', 'Book', 'Book-Chapter', 'Book-Section', 'Doctoral-Thesis', 'Doctoral-Thesis', 'Master-Thesis']
    this.objetsLodList['CROSSREF'] = ['Article', 'Book', 'Book-Chapter', 'Book-Section', 'Doctoral-Thesis', 'Doctoral-Thesis', 'Master-Thesis']
    this.objetsLodList['WIKIDATA'] = ['Person']
    this.objetsLodList['ORCID'] = ['Person']
    this.objetsLodList['DOAJ'] = ['Article']
    this.objetsLodList['PUBMED'] = ['Article']
    this.objetsLodList['DBLP'] = ['Person']
    this.objetsLodList['*'] = ['Article', 'Book', 'Book-Chapter', 'Book-Section', 'Doctoral-Thesis', 'Doctoral-Thesis', 'Master-Thesis', 'Person']
  }

  onActionSelected() {
    console.log('onActionSelected', this.actionSearch);
  }

  onNodeSelected() {
    this.objetsList = [];
    if (this.nodes[this.searchRequest.filter.node].length == 1) {
      this.searchRequest.filter.tripleStore = this.nodes[this.searchRequest.filter.node];
      this.onTripleStoreSelected();
    }
  }

  onTripleStoreSelectedWithTripleStore(tripleStore) {
    this.searchRequest.filter.tripleStore = tripleStore;
    this.onTripleStoreSelected()
  }

  onTripleStoreSelected() {
    console.log('Tas llamado a onTripleStoreSelected', this.searchRequest.filter.tripleStore);
    this.objetsList = [];
    this.searchRequest.filter.className = undefined;
    if (this.searchRequest.filter.tripleStore) {
      if (this.actionSearch === 'lod') {
        this.loadLodObjects();
        this.searchRequest.filter.dataSource = undefined;
      } else {
        this.loadObjects();
      }
    }
  }

  setTripleStore(tripleStore) {
    this.searchRequest.filter.tripleStore = tripleStore;
  }


  launchSearch() {
    this.responseIsReady = false;
    if (this.actionSearch === 'class') {
      this.spinner.show();
      this.discoveryService.doRequestFindSimilaritiesByClass(this.searchRequest).then((data) => {
        this.responseIsReady = true;
        this.responseData = data;
        this.searchRequest.filter.node = undefined;
        this.searchRequest.filter.tripleStore = undefined;
        this.searchRequest.filter.className = undefined;
        this.spinner.hide();
      }, (error) => {
        this.responseIsReady = true;
        this.spinner.hide();
      });
    } else if (this.actionSearch === 'instance') {
      this.spinner.show();
      this.discoveryService.doRequestFindSimilaritiesByInstance(this.searchRequest, this.bodyRequest).then((data) => {
        this.responseIsReady = true;
        this.responseData = data;
        this.searchRequest.filter.node = undefined;
        this.searchRequest.filter.tripleStore = undefined;
        this.searchRequest.filter.className = undefined;
        console.log('Respuesta', data);
        this.spinner.hide();
      }, (error) => {
        this.responseIsReady = true;
        this.spinner.hide();
      });
    } else if (this.actionSearch === 'lod') {
      this.spinner.show();
      this.discoveryService.doRequestFindSimilaritiesInLod(this.searchRequest).then((data) => {
        this.responseIsReady = true;
        this.responseData = data;
        this.searchRequest.filter.node = undefined;
        this.searchRequest.filter.tripleStore = undefined;
        this.searchRequest.filter.className = undefined;
        this.searchRequest.filter.dataSource = undefined;
        console.log('Respuesta', data);
        this.spinner.hide();
      }, (error) => {
        this.responseIsReady = true;
        this.spinner.hide();
      });
    }
  }

  evaluateJsonBody(event) {
    if (!this.isJsonString(this.bodyRequest)) {
      alert("Invalid JSON Format");
      this.bodyRequest = null;
    }
    alert()
  }

  isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

}


