import { Component, OnInit } from '@angular/core';
import { HelperGraphics } from 'src/app/_helpers/helperGraphics';
import { Graphic } from 'src/app/_models/graphic';
import { GraphicModelTree } from 'src/app/_models/graphicModelTree';
import { GraphicService } from 'src/app/_services/graphic.service';
import { StatisticService } from 'src/app/_services/statistic.service';
import { FindRequest } from '../_helpers/search';
import { DOMAIN } from '../configuration';
import { DiscoveryService } from '../_services/discovery/discovery.service';
import { UrisService } from '../_services/uris/uris.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-uris',
  templateUrl: './uris.component.html'
})
export class UrisComponent implements OnInit {

  actionSearch: string;
  typeSearch: string;
  searchRequest: FindRequest = new FindRequest();
  domain: string;
  objetsList: Array<any>;
  localStorages: Array<any>;
  dataIsReady = false;
  responseIsReady: boolean = false;
  responseData: any;

  constructor(private discoveryService: DiscoveryService, private urisService: UrisService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.domain = DOMAIN;
    this.searchRequest.filter.type = 'res';
    this.loadObjects();
    this.loadLocalStorages();
  }

  loadObjects() {
    this.objetsList = [];
    this.discoveryService.getObjectList(new FindRequest()).subscribe((objects: Array<Object>) => {
      for (let i = 0; i < objects.length; i++) {
        this.objetsList.push(String(objects[i]).split("/").slice(-1)[0]);
      }
      this.objetsList.sort();
      this.dataIsReady = this.objetsList != undefined && this.localStorages != undefined;
    });
  }

  loadLocalStorages() {
    this.localStorages = [];
    this.urisService.getAllLocalStorages().then((data: Array<string>) => {
      this.localStorages = data;
      this.localStorages.sort();
      this.dataIsReady = this.objetsList != undefined && this.localStorages != undefined;
    });
  }

  launchSearch() {
    if (this.actionSearch === 'canonical') {
      this.spinner.show();
      this.urisService.getCanonicalUris(this.searchRequest, this.typeSearch).then((data) => {
        this.responseIsReady = true;
        this.responseData = data;
        console.log('this.responseData', this.responseData);
        this.spinner.hide();
      }, (error) => {
        this.responseIsReady = true;
        this.spinner.hide();
      });
    } else if (this.actionSearch === 'local') {
      this.spinner.show();
      this.urisService.getLocalUris(this.searchRequest).then((data) => {
        this.responseIsReady = true;
        this.responseData = data;
        console.log('this.responseData', this.responseData);
        this.spinner.hide();
      }, (error) => {
        this.responseIsReady = true;
        this.spinner.hide();
      });
    }
  }
}