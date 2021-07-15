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

  deactivateNode(findRequest: FindRequest) {
    let queryParams = [];
    for (let key in findRequest.filter) {
      queryParams.push(key + '=' + findRequest.filter[key])
    }
    return new Promise((resolve, reject) => {
      let formData: any = new FormData()
      let xhr = new XMLHttpRequest()
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
      console.log('do request', Helper.getServiceDiscoveryUrl() + "/service-discovery/node/add-deactivate?" + queryParams.join('&'));
      xhr.open("POST", Helper.getServiceDiscoveryUrl() + "/service-discovery/node/add-deactivate?" + queryParams.join('&'));

      xhr.responseType = 'json';
      xhr.send();
    });
  }

  activateNode(findRequest: FindRequest) {
    let queryParams = [];
    for (let key in findRequest.filter) {
      queryParams.push(key + '=' + findRequest.filter[key])
    }
    return new Promise((resolve, reject) => {
      let formData: any = new FormData()
      let xhr = new XMLHttpRequest()
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
      console.log('do request', Helper.getServiceDiscoveryUrl() + "/service-discovery/node/remove-deactivate?" + queryParams.join('&'));
      xhr.open("POST", Helper.getServiceDiscoveryUrl() + "/service-discovery/node/remove-deactivate?" + queryParams.join('&'));

      xhr.responseType = 'json';
      xhr.send();
    });
  }

  getNodesListWitExclude(findRequest: FindRequest) {
    let queryParams = [];
    for (let key in findRequest.filter) {
      queryParams.push(key + '=' + findRequest.filter[key])
    }
    return new Promise((resolve, reject) => {
      let formData: any = new FormData()
      let xhr = new XMLHttpRequest()
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
      console.log('do request', Helper.getServiceDiscoveryUrl() + "/service-discovery/exclude/nodes/name?" + queryParams.join('&'));
      xhr.open("GET", Helper.getServiceDiscoveryUrl() + "/service-discovery/exclude/nodes/name?" + queryParams.join('&'));

      xhr.responseType = 'json';
      xhr.send();
    });
  }
}
