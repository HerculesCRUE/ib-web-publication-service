import { Component, OnInit } from '@angular/core';
import { FindRequest } from 'src/app/_helpers/search';
import { ServiceDiscoveryService } from 'src/app/_services/service-discovery/service-discovery.service';
import { DOMAIN, NODE } from '../../configuration';

@Component({
  selector: 'app-service-discovery',
  templateUrl: './service-discovery.component.html',
  styleUrls: ['./service-discovery.component.css', './service-discovery.component.scss']
})
export class ServiceDiscoveryComponent implements OnInit {

  responseData: Array<any>;
  dataIsReady: boolean;
  currentNode: string;

  constructor(private serviceDiscoveryService: ServiceDiscoveryService) { }

  ngOnInit(): void {
    this.loadAllNodes()
  }

  loadAllNodes() {
    this.responseData = [];
    this.currentNode = NODE;
    this.serviceDiscoveryService.getAllNodes().then((data: Array<string>) => {
      this.responseData = data;
      if (this.responseData) {
        for (let i = 0; i < this.responseData.length; i++) {
          this.responseData[i].isDesactivated = (this.responseData[i].deactivatedFor.indexOf(NODE) > -1);
        }
      }
      console.log('data', this.responseData);
      this.dataIsReady = true;
    });
  }

  onNodeStateChange(node, isActivate) {
    node.isDesactivated = !isActivate;
    console.log('onNodeStateChange', node)
    if (isActivate) {
      let findRequest = new FindRequest()
      findRequest.filter.nodeName = node.name;
      findRequest.filter.activateFor = this.currentNode;
      this.serviceDiscoveryService.activateNode(findRequest).then(data => {
        console.log()
        this.loadAllNodes();
      });
    } else {
      let findRequest = new FindRequest()
      findRequest.filter.nodeName = node.name;
      findRequest.filter.deactivateFor = this.currentNode;
      this.serviceDiscoveryService.deactivateNode(findRequest).then(data => {
        this.loadAllNodes();
      });
    }
  }

  getClassNodeIcon(node) {
    if (!node.isDesactivated) {
      return "oi oi-circle-check";
    } else {
      return "oi oi-circle-x";
    }
  }

}
