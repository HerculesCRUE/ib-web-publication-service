import {
  HttpHandler,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpRequest,
  HttpUserEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/operators';

import { LoginService } from '../_services/login.service';
import { Router } from '@angular/router';
import { AbstractHttpInterceptor } from '../_helpers/abstract-http-interceptor';

@Injectable()
export class TokenizedInterceptor extends AbstractHttpInterceptor {
  constructor(private loginService: LoginService, private router: Router,) {
    super();
  }

  protected isOauth(): boolean {
    return false;
  }
  protected interceptInternal(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
  > {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken && !req.urlWithParams.includes('token')) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    return next
      .handle(req)
      .pipe(
        catchError((error: Response) => this.handleError(error, req, next))
      ) as any;
  }

  private handleError(
    error: Response,
    req: HttpRequest<any>,
    next: HttpHandler
  ) {

    if (error.status === 401) {
      this.loginService.checkIsValidToken().subscribe((data: any) => {
        console.log(data);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        this.windowReload();
      }, (e) => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.router.navigate(['./main/home']);
      });
    }

    return throwError(error);
  }

  windowReload() {
    window.location.reload();
  }
}
