import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AbstractService } from '../_helpers/abstract';
import { FindRequest, Page } from '../_helpers/search';
import { Helper } from '../_helpers/utils';
import { SparqlQuery } from '../_models/sparqlQuery';

@Injectable({
  providedIn: 'root'
})
export class SparqlService extends AbstractService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  find(findRequest: FindRequest): Observable<Page<SparqlQuery>> {
    // Filter params
    let parameters = new HttpParams();
    parameters = Helper.addParam(parameters, 'tipo', findRequest.filter.tipo);
    parameters = Helper.addParam(parameters, 'username', findRequest.filter.username);
    parameters = Helper.addParam(parameters, 'sparqlName', findRequest.filter.sparqlName);
    // Pagination params
    parameters = Helper.addPaginationParams(parameters, findRequest.pageRequest);

    return this.httpClient
      .get(Helper.getUrl('/trellis/search'), {
        params: parameters
      }).pipe(
        catchError(this.handleError)
      );
  }

  save(query: string): Observable<any> {
    return this.httpClient
      .post(Helper.getUrl('/trellis/save'), query)
      .pipe(catchError(this.handleError));
  }

}
