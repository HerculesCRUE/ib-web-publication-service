import { Injectable } from '@angular/core';
import { FindRequest, Page } from '../_helpers/search';
import { AbstractService } from '../_helpers/abstract';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Helper } from '../_helpers/utils';
import { Observable } from 'rxjs';
import { DataImporter } from '../_models/dataImporter';
import { catchError } from 'rxjs/operators';
import { OrganizationDetail } from '../_models/organizationDetail';

@Injectable({
  providedIn: 'root',
})
export class DataImporterService extends AbstractService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  /**
   *
   *
   * @param {FindRequest} findRequest
   * @return {*}  {Observable<Page<DataImporter>>}
   * @memberof DataImporterService
   */
  find(findRequest: FindRequest): Observable<Page<DataImporter>> {
    // Filter params
    let parameters = new HttpParams();
    parameters = Helper.addParam(parameters, 'types', findRequest.filter.type);
    parameters = Helper.addParam(parameters, 'financing', findRequest.filter.financing);
    parameters = Helper.addParam(parameters, 'qa', findRequest.filter.qa);
    parameters = Helper.addParam(parameters, 'title', findRequest.filter.name);
    // Pagination params
    parameters = Helper.addPaginationParams(parameters, findRequest.pageRequest);
    return this.httpClient
      .get(Helper.getUrl('/dataimporter/search'), {
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
   * @memberof DataImporterService
   */
  getById(id: string, type: string): Observable<OrganizationDetail> {
    // Filter params
    return this.httpClient
      .get(Helper.getUrl('/dataimporter/' + id)).pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Method in order to launch the importation
   * @param data input param
   */
  import(data: DataImporter): Observable<DataImporter> {
    console.log("Import in service " + data);
    return this.httpClient
      .post(Helper.getUrl('/dataimporter/import'), data)
      .pipe(catchError(this.handleError));
  }

}

