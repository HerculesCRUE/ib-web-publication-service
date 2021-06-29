import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from 'src/app/_helpers/abstract';
import { FindRequest } from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';

@Injectable({
  providedIn: 'root'
})
export class UrisService extends AbstractService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  getAllLocalStorages() {
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
      xhr.open("GET", Helper.getUrisFactoryUrl() + "/uri-factory/local-storages");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.responseType = 'json';
      xhr.send();
    });
  }

  getCanonicalUris(findRequest: FindRequest, type: string) {
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
      console.log('do request', Helper.getUrisFactoryUrl() + "/uri-factory/canonical/" + type + "?" + queryParams.join('&'));
      xhr.open("GET", Helper.getUrisFactoryUrl() + "/uri-factory/canonical/" + type + "?" + queryParams.join('&'));
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.responseType = 'json';
      xhr.send();
    });
  }

  getLocalUris(findRequest: FindRequest) {
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
      console.log('do request', Helper.getUrisFactoryUrl() + "/uri-factory/local/canonical?" + queryParams.join('&'));
      xhr.open("GET", Helper.getUrisFactoryUrl() + "/uri-factory/local/canonical?" + queryParams.join('&'));
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.responseType = 'json';
      xhr.send();
    });
  }


}
