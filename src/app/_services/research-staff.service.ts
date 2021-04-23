import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AbstractService } from '../_helpers/abstract';
import { FindRequest, Page } from '../_helpers/search';
import { Helper } from '../_helpers/utils';
import { Person } from '../_models/person';
import { PersonDetail } from '../_models/personDetail';

/**
 *
 *
 * @export
 * @class ResearchStaffService
 * @extends {AbstractService}
 */
@Injectable({
  providedIn: 'root'
})
export class ResearchStaffService extends AbstractService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  /**
   *
   *
   * @param {FindRequest} findRequest
   * @return {*}  {Observable<Page<Person>>}
   * @memberof ResearchStaffService
   */
  find(findRequest: FindRequest): Observable<Page<Person>> {
    // Filter params
    let parameters = new HttpParams();
    parameters = Helper.addParam(parameters, 'tipo', findRequest.filter.type);
    parameters = Helper.addParam(parameters, 'name', findRequest.filter.name);
    parameters = Helper.addParam(parameters, 'ini', findRequest.filter.ini);
    parameters = Helper.addParam(parameters, 'fin', findRequest.filter.fin);
    // Pagination params
    parameters = Helper.addPaginationParams(parameters, findRequest.pageRequest);

    return this.httpClient
      .get(Helper.getUrl('/researchstaff/search'), {
        params: parameters
      }).pipe(
        catchError(this.handleError)
      );
  }

  /**
   *
   *
   * @param {string} id
   * @return {*}  {Observable<PersonDetail>}
   * @memberof ResearchStaffService
   */
  getPerson(id: string): Observable<PersonDetail> {
    // Filter params
    return this.httpClient
      .get(Helper.getUrl('/person/' + id)).pipe(
        catchError(this.handleError)
      );
  }
}
