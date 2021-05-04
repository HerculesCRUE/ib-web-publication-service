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
        const localeLang = this.translateHelper.getLocalLang() ? this.translateHelper.getLocalLang() : 'es';

        if (!httpRequest.urlWithParams.includes('json') && !httpRequest.urlWithParams.includes(SKIPORT)
            && !httpRequest.urlWithParams.includes('logout') && !httpRequest.urlWithParams.includes('trellis') && !httpRequest.urlWithParams.includes('keycloak') &&
            !httpRequest.urlWithParams.includes('realms')) {

            cloneReq = httpRequest.clone({ url: httpRequest.url + '?language=@' + localeLang });

        } else {
            cloneReq = httpRequest;
        }

        return next.handle(cloneReq);
    }
}
