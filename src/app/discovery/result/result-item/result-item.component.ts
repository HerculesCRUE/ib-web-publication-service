import { Component, Input, OnInit } from '@angular/core';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { FindRequest } from 'src/app/_helpers/search';
import { DiscoveryService } from 'src/app/_services/discovery/discovery.service';

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



  constructor(private discoveryService: DiscoveryService, private _config: NgbAccordionConfig, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  onActionOverManualSimilitude(isAcepted: boolean, itemManual: any) {
    this.manualDecisions[itemManual.entityId] = {
      'accepted': isAcepted,
      'className': this.item.className,
      'entityIdMainObject': this.item.entityId,
      'entityIdRelatedObject': itemManual.entityId
    };
    let searchRequest = new FindRequest();
    searchRequest.filter.className = this.manualDecisions[itemManual.entityId].className;
    searchRequest.filter.decision = this.manualDecisions[itemManual.entityId].accepted ? "ACCEPTED" : "DISCARDED";
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
