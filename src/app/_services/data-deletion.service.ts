import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { post } from 'superagent';
import { AbstractService } from '../_helpers/abstract';
import { Helper } from '../_helpers/utils';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataDeletionService extends AbstractService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  delete(user: string, subject: string, message: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const params = new HttpParams({
      fromObject: {
        mailList: [user],
        subject: 'subject',
        text: message
      }
    });

    return this.httpClient.post(Helper.getUrl('/email/send'), JSON.stringify(
      {
        "mailList": [user],
        "subject": subject,
        "text": message
      }
    ), httpOptions);
  }

}

