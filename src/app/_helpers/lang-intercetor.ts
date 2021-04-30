import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateHelperService } from '../_services/translate-helper.service';
import { SKIPORT } from '../configuration';

@Injectable()
export class LangInterceptor implements HttpInterceptor {
    constructor(private translateHelper: TranslateHelperService) { }
    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let cloneReq;
        let localeLang = '';
        this.translateHelper.getLocalLang() ? localeLang = this.translateHelper.getLocalLang() : localeLang = 'es';
        if (!httpRequest.urlWithParams.includes('json') && !httpRequest.urlWithParams.includes(SKIPORT)
            && !httpRequest.urlWithParams.includes('logout') && !httpRequest.urlWithParams.includes('sparql') && !httpRequest.urlWithParams.includes('keycloak') &&
            !httpRequest.urlWithParams.includes('realms')) {
            if (httpRequest.urlWithParams.includes('?')) {
                cloneReq = httpRequest.clone({ url: httpRequest.url + '?language=@' + localeLang });
            } else {
                cloneReq = httpRequest.clone({ url: httpRequest.url + '?language=@' + localeLang });
            }

        } else {
            cloneReq = httpRequest;
        }

        return next.handle(cloneReq);
    }
}
