import { Injectable } from '@angular/core';
import { AbstractService } from 'src/app/_helpers/abstract';
import { FindRequest } from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';

@Injectable({
  providedIn: 'root'
})
export class ServiceDiscoveryService extends AbstractService {

  constructor() {
    super();
    console.log('ServiceDiscoveryService URL', Helper.getServiceDiscoveryUrl());
  }


  getAllNodes() {
    let queryParams = [];
    return new Promise((resolve, reject) => {
      let formData: any = new FormData()
      let xhr = new XMLHttpRequest()
      xhr.withCredentials = false;
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('OK xhr.response', xhr.response);
            resolve(xhr.response)
          } else {
            console.log('BAD xhr.response', xhr.response);
            reject(xhr.response)
          }
        }
      }
      console.log('do request', Helper.getServiceDiscoveryUrl() + "/service-discovery");
      xhr.open("GET", Helper.getServiceDiscoveryUrl() + "/service-discovery");
      xhr.setRequestHeader("Content-Type", "application/json");
      //xhr.setRequestHeader('Content-Security-Policy', 'upgrade-insecure-requests');
      xhr.responseType = 'json';
      xhr.send();
    });
  }
}
