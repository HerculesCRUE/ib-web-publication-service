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
      console.log('do request', "http://localhost:9327/discovery/entity-link?" + queryParams.join('&'));
      xhr.open("POST", "http://localhost:9327/discovery/entity-link?" + queryParams.join('&'));

      xhr.responseType = 'json';
      xhr.send();
    });
    /*
    return Observable.create(function (observer) {
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            observer.next(xhr);
          } else {
            observer.error(xhr);
          }
        }
      };

      xhr.open("POST", "http://localhost:9327/discovery/entity-link?applyDelta=false&className=Funding&doSynchronous=true&linkEntities=false&node=um&propague_in_kafka=true&tripleStore=fuseki&userId=1");

      xhr.responseType = 'json';

      xhr.onload = function () {
        if (xhr.readyState === xhr.DONE) {
          if (xhr.status === 200) {
            console.log('xhr.response', xhr.response);
            observer.next(xhr.response);
          } else {
            console.log('xhr.response', xhr.response);
            observer.error(xhr.response);
          }
        } else {
          console.log('xhr.response', xhr.response);
          observer.error(xhr.response);
        }
      };
      xhr.send();
    });
    */
  }
}
