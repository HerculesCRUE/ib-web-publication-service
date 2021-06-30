import { Component, OnInit } from '@angular/core';
import { ServiceDiscoveryService } from 'src/app/_services/service-discovery/service-discovery.service';

@Component({
  selector: 'app-service-discovery',
  templateUrl: './service-discovery.component.html',
  styleUrls: ['./service-discovery.component.css', './service-discovery.component.scss']
})
export class ServiceDiscoveryComponent implements OnInit {

  responseData: Array<any>;
  dataIsReady: boolean;

  constructor(private serviceDiscoveryService: ServiceDiscoveryService) { }

  ngOnInit(): void {
    this.loadAllNodes()
  }

  loadAllNodes() {
    this.responseData = [];
    this.serviceDiscoveryService.getAllNodes().then((data: Array<string>) => {
      this.responseData = data;
      console.log('data', this.responseData);
      this.dataIsReady = true;
    });
  }

}
