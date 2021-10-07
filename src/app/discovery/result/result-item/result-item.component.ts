import { Component, Input, OnInit } from '@angular/core';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { FindRequest } from 'src/app/_helpers/search';
import { DiscoveryService } from 'src/app/_services/discovery/discovery.service';
import { LoginService } from 'src/app/_services/login.service';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.css', './result-item.component.scss']
})
export class ResultItemComponent implements OnInit {

  @Input() item: any;

  @Input() requestCode: string;

  @Input() userId: string;

  @Input() requestType: string;

  manualDecisions = {}

  isAdmin = false;



  constructor(private discoveryService: DiscoveryService, private _config: NgbAccordionConfig, private spinner: NgxSpinnerService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.keycloakIsAdmin().subscribe(res => { this.isAdmin = res });
  }

  getPrintableEntity(item) {
    let name = "";
    if (item.attributes.title) {
      name = item.attributes.title;
    } else if (item.attributes.name) {
      name = item.attributes.name;
    } else if (item.attributes.description) {
      name = item.attributes.name;
    } else {
      name = "Instance"
    }
    return name + " (Id: " + item.entityId + ")";
  }

  onActionOverManualSimilitude(isAcepted: boolean, itemManual: any, inverted: boolean) {
    this.manualDecisions[itemManual.entityId] = {
      'accepted': isAcepted,
      'className': this.item.className,
      'entityIdMainObject': this.item.entityId,
      'entityIdRelatedObject': itemManual.entityId
    };
    let searchRequest = new FindRequest();
    searchRequest.filter.className = this.manualDecisions[itemManual.entityId].className;
    if (this.manualDecisions[itemManual.entityId].accepted) {
      if (!inverted) {
        searchRequest.filter.decision = "ACCEPTED";
      } else {
        searchRequest.filter.decision = "INVERTED";
      }
    } else {
      searchRequest.filter.decision = "DISCARDED";
    }
    console.log('searchRequest.filter.decision', searchRequest.filter.decision);
    searchRequest.filter.entityIdMainObject = this.manualDecisions[itemManual.entityId].entityIdMainObject;
    searchRequest.filter.entityIdRelatedObject = this.manualDecisions[itemManual.entityId].entityIdRelatedObject;
    this.spinner.show();
    this.discoveryService.doApplyAcction(searchRequest).then((data: Array<any>) => {

      let results = {};

      for (let i = 0; i < data.length; i++) {
        if (!results[data[i].action]) {
          results[data[i].action] = {};
        }
        for (let j = 0; j < data[i].items.length; j++) {
          if (!results[data[i].action][data[i].items[j].entityId]) {
            results[data[i].action][data[i].items[j].entityId] = data[i].items[j];
          }
        }
      }

      console.log('response', results);
      this.manualDecisions[itemManual.entityId].response = results;
      this.spinner.hide();
    }, (error) => {
      console.log('response error');
      this.manualDecisions[itemManual.entityId].response = "Error";
      this.spinner.hide();
    });
  }


}
