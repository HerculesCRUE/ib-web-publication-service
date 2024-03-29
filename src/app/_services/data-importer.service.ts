import { Injectable } from '@angular/core';
import { FindRequest, Page } from '../_helpers/search';
import { AbstractService } from '../_helpers/abstract';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Helper } from '../_helpers/utils';
import { Observable } from 'rxjs';
import { DataImporter } from '../_models/dataImporter';
import { catchError } from 'rxjs/operators';
import { OrganizationDetail } from '../_models/organizationDetail';
import { Order, Direction } from '../_helpers/search';
import { DataImporterError } from '../_models/dataImporterError';

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
    parameters = Helper.addParam(parameters, 'type', findRequest.filter.type);


    if (findRequest && findRequest.pageRequest && !findRequest.pageRequest.property) {

      // we set default order (workaround!!!!). The view is a mess!!!
      const order = new Order();
      order.property = 'startTime';
      order.direction = Direction.DESC;

      findRequest.setOrder(order.direction, order.property);
    }

    // Pagination params
    parameters = Helper.addPaginationParams(parameters, findRequest.pageRequest);
    return this.httpClient
      .get(Helper.getImporterUrl('/importer/search'), {
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
      .get(Helper.getUrl('/importer/' + id)).pipe(
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
      .post(Helper.getImporterUrl('/importer/schedule'), data)
      .pipe(catchError(this.handleError));
  }

  /**
   * Returns the errors associated to an import execution
   *
   * @param {string} id execution id
   * @return {*}  {Observable<DataImporterError>}
   * @memberof DataImporterService
   */
  findErrors(id: string): Observable<DataImporterError> {
    return this.httpClient
      .get(Helper.getUrl('/importer/' + id + '/errors'))
      .pipe(catchError(this.handleError));
  }

}

