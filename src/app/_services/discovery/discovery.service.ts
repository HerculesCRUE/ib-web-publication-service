import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Helper } from '../../_helpers/utils';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AbstractService } from '../../_helpers/abstract';
import { DiscoveryState } from 'src/app/_models/discoveryState';
import { FindRequest, Page } from 'src/app/_helpers/search';
import { resolve } from 'dns';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscoveryService extends AbstractService {

  constructor(private httpClient: HttpClient) {
    super();
    console.log('DiscoveryService is up');
  }



  getDiscoveryState(findRequest: FindRequest): Observable<Page<DiscoveryState>> {
    let parameters = new HttpParams();
    // Pagination params
    parameters = Helper.addPaginationParams(parameters, findRequest.pageRequest);

    return this.httpClient.get(Helper.getDiscoveryUrl() + '/discovery/status', {
      params: parameters
    }).pipe(
      catchError(this.handleError)
    );
  }

  forceDataReload(findRequest: FindRequest): Observable<Page<string>> {
    let parameters = new HttpParams();
    // Pagination params
    parameters = Helper.addPaginationParams(parameters, findRequest.pageRequest);

    return this.httpClient.post(Helper.getDiscoveryUrl() + '/cache/force-reload', {
      params: parameters
    }).pipe(
      catchError(this.handleError)
    );
  }


  getObjectList(findRequest: FindRequest) {
    let parameters = new HttpParams();
    parameters = Helper.addParam(parameters, 'domain', findRequest.filter.domain);
    parameters = Helper.addParam(parameters, 'node', findRequest.filter.node);
    parameters = Helper.addParam(parameters, 'service', findRequest.filter.service);
    parameters = Helper.addParam(parameters, 'tripleStore', findRequest.filter.tripleStore);
    // Pagination params
    parameters = Helper.addPaginationParams(parameters, findRequest.pageRequest);

    return this.httpClient.get(Helper.getFederationUrl() + '/data-fetcher/objects', {
      params: parameters
    }).pipe(
      catchError(this.handleError)
    );
  }

  getObjectLodList(findRequest: FindRequest) {
    let parameters = new HttpParams();
    return this.httpClient.get(Helper.getFederationUrl() + '/lod/clases', {
      params: parameters
    }).pipe(
      catchError(this.handleError)
    );
  }

  getDatasetLodList(findRequest: FindRequest) {
    let parameters = new HttpParams();
    return this.httpClient.get(Helper.getFederationUrl() + '/lod/datasets', {
      params: parameters
    }).pipe(
      catchError(this.handleError)
    );
  }

  getObjectStats(findRequest: FindRequest) {
    let parameters = new HttpParams();
    parameters = Helper.addParam(parameters, 'className', findRequest.filter.className);
    parameters = Helper.addParam(parameters, 'node', findRequest.filter.node);
    parameters = Helper.addParam(parameters, 'tripleStore', findRequest.filter.tripleStore);
    // Pagination params
    parameters = Helper.addPaginationParams(parameters, findRequest.pageRequest);

    return this.httpClient.get(Helper.getDiscoveryUrl() + '/discovery/entity/stats', {
      params: parameters
    }).pipe(
      catchError(this.handleError)
    );
  }

  getNodesList(findRequest: FindRequest) {
    let parameters = new HttpParams();
    // Pagination params
    parameters = Helper.addPaginationParams(parameters, findRequest.pageRequest);

    return this.httpClient.get(Helper.getServiceDiscoveryUrl() + '/service-discovery', {
      params: parameters
    }).pipe(
      catchError(this.handleError)
    );
  }

  doRequestFindSimilaritiesByClass(findRequest: FindRequest) {
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
      console.log('do request', Helper.getDiscoveryUrl() + "/discovery/entity-link?" + queryParams.join('&'));
      xhr.open("POST", Helper.getDiscoveryUrl() + "/discovery/entity-link?" + queryParams.join('&'));

      xhr.responseType = 'json';
      xhr.send();
    });
  }

  doRequestFindSimilaritiesByInstance(findRequest: FindRequest, body: string) {
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
      console.log('do request', Helper.getDiscoveryUrl() + "/discovery/entity-link/instance?" + queryParams.join('&'));
      xhr.open("POST", Helper.getDiscoveryUrl() + "/discovery/entity-link/instance?" + queryParams.join('&'));
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.responseType = 'json';
      xhr.send(body);
    });
  }

  doRequestFindSimilaritiesInLod(findRequest: FindRequest) {
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
      console.log('do request', Helper.getDiscoveryUrl() + "/discovery/lod/search?" + queryParams.join('&'));
      xhr.open("POST", Helper.getDiscoveryUrl() + "/discovery/lod/search?" + queryParams.join('&'));

      xhr.responseType = 'json';
      xhr.send();
    });
  }

  doApplyAcction(findRequest: FindRequest) {
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
            resolve(xhr.response)
          } else {
            reject(xhr.response)
          }
        }
      }
      console.log('doing request: ' + Helper.getDiscoveryUrl() + "/discovery/object-result/action?" + queryParams.join('&'))
      xhr.open("POST", Helper.getDiscoveryUrl() + "/discovery/object-result/action?" + queryParams.join('&'));

      xhr.responseType = 'json';
      xhr.send();
    });
  }


  getResultListByUserId(userId: string) {
    let queryParams = [];
    return new Promise((resolve, reject) => {
      let formData: any = new FormData()
      let xhr = new XMLHttpRequest()
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.response)
          } else {
            reject(xhr.response)
          }
        }
      }
      console.log('doing request: ' + Helper.getDiscoveryUrl() + "/discovery/result/" + userId)
      xhr.open("GET", Helper.getDiscoveryUrl() + "/discovery/result/" + userId);

      xhr.responseType = 'json';
      xhr.send();
    });
  }

  getResult(findRequest: FindRequest) {
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
            resolve(xhr.response)
          } else {
            reject(xhr.response)
          }
        }
      }
      console.log('doing request: ' + Helper.getDiscoveryUrl() + "/discovery/result?" + queryParams.join('&'))
      xhr.open("GET", Helper.getDiscoveryUrl() + "/discovery/result?" + queryParams.join('&'));

      xhr.responseType = 'json';
      xhr.send();
    });
  }

  getOpenResult(findRequest: FindRequest) {
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
            resolve(xhr.response)
          } else {
            reject(xhr.response)
          }
        }
      }
      console.log('doing request: ' + Helper.getDiscoveryUrl() + "/discovery/object-result/open?" + queryParams.join('&'))
      xhr.open("GET", Helper.getDiscoveryUrl() + "/discovery/object-result/open?" + queryParams.join('&'));

      xhr.responseType = 'json';
      xhr.send();
    });
  }

}
