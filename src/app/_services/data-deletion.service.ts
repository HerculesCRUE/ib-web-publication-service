import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractService } from '../_helpers/abstract';

@Injectable({
  providedIn: 'root',
})
export class DataDeletionService extends AbstractService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  delete(): Observable<any> {
    return null;
  }

}

