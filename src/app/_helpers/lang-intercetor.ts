import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateHelperService } from '../_services/translate-helper.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class LangInterceptor implements HttpInterceptor {
    constructor(private translateHelper: TranslateHelperService) { }
    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let cloneReq;
        let localeLang = '';
        this.translateHelper.getLocalLang() ? localeLang = this.translateHelper.getLocalLang() : localeLang = 'es';
        if (!httpRequest.urlWithParams.includes('json') && !httpRequest.urlWithParams.includes(environment.skipPort)
            && !httpRequest.urlWithParams.includes('logout') && !httpRequest.urlWithParams.includes('keycloak')) {
            console.log(httpRequest.urlWithParams);
            if (httpRequest.urlWithParams.includes('?')) {
                cloneReq = httpRequest.clone({ url: httpRequest.urlWithParams + '&language=@' + localeLang });
            } else {
                cloneReq = httpRequest.clone({ url: httpRequest.urlWithParams + '?language=@' + localeLang });
            }

        } else {
            cloneReq = httpRequest;
        }

        return next.handle(cloneReq);
    }
}
