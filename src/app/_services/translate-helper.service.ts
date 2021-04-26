import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateHelperService {

  constructor(private translate: TranslateService) { }

  /**
   *
   *
   * @param {string} selectLang
   * @memberof TranslateHelperService
   */
  setTransLanguage(selectLang: string) {
    this.translate.use(selectLang);
    this.saveLangOnLocal(selectLang);
  }

  /**
   *
   *
   * @return {*} 
   * @memberof TranslateHelperService
   */
  getTransLanguage() {
    return this.translate.getLangs();
  }

  /**
   *
   *
   * @param {string} selectLang
   * @memberof TranslateHelperService
   */
  saveLangOnLocal(selectLang: string) {
    localStorage.setItem('lang', selectLang);
  }


  /**
   *
   *
   * @return {*}  {string}
   * @memberof TranslateHelperService
   */
  getLocalLang(): string {
    if (localStorage.getItem('lang')) {
      return localStorage.getItem('lang');
    } else {
      return undefined;
    }
  }
}
