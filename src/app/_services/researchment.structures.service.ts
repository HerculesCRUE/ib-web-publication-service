import { Injectable } from '@angular/core';
import { FindRequest, Page } from '../_helpers/search';
import { AbstractService } from '../_helpers/abstract';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Helper } from '../_helpers/utils';
import { Observable } from 'rxjs';
import { University } from '../_models/university';
import { catchError } from 'rxjs/operators';
import { OrganizationDetail } from '../_models/organizationDetail';

@Injectable({
  providedIn: 'root',
})
export class ResearchmentStructuresService extends AbstractService {
  // mock data



  constructor(private httpClient: HttpClient) {
    super();
  }


  /**
   *
   *
   * @param {FindRequest} findRequest
   * @return {*}  {Observable<Page<University>>}
   * @memberof ResearchmentStructuresService
   */
  find(findRequest: FindRequest): Observable<Page<University>> {
    // Filter params
    let parameters = new HttpParams();
    parameters = Helper.addParam(parameters, 'types', findRequest.filter.type);
    parameters = Helper.addParam(parameters, 'financing', findRequest.filter.financing);
    parameters = Helper.addParam(parameters, 'qa', findRequest.filter.qa);
    parameters = Helper.addParam(parameters, 'title', findRequest.filter.name);
    // Pagination params
    parameters = Helper.addPaginationParams(parameters, findRequest.pageRequest);
    return this.httpClient
      .get(Helper.getUrl('/organization/search'), {
        params: parameters
      }).pipe(
        catchError(this.handleError)
      );
  }

  /**
   *
   *
   * @param {string} id
   * @param {string} type
   * @return {*}  {Observable<OrganizationDetail>}
   * @memberof ResearchmentStructuresService
   */
  getById(id: string, type: string): Observable<OrganizationDetail> {
    // Filter params
    return this.httpClient
      .get(Helper.getUrl('/organization/' + id + '/' + type)).pipe(
        catchError(this.handleError)
      );
  }

}

