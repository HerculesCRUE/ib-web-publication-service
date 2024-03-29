import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LOCALE_CONFIG } from './configuration';
import { TranslateHelperService } from './_services/translate-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(translate: TranslateService, private translateHelper: TranslateHelperService) {
    translate.addLangs(LOCALE_CONFIG.availableLanguages);
    const currentSelectetLang = this.translateHelper.getLocalLang();
    translate.setDefaultLang(LOCALE_CONFIG.fallbackLocale);


    const regExp: RegExp = new RegExp(this.composeRegularExpression());

    let browserLang: string = translate
      .getBrowserCultureLang()
      .replace('-', '_');

    if (!browserLang.match(new RegExp(regExp))) {
      browserLang = translate.getBrowserLang();
    }

    if (currentSelectetLang) {
      translate.setDefaultLang(currentSelectetLang);
    } else {
      translate.use(
        browserLang.match(regExp) ? browserLang : LOCALE_CONFIG.fallbackLocale
      );
    }

  }

  /**
   * Construye la expresión regular para obtener el idioma del navegador.
   */
  private composeRegularExpression(): string {
    let regularExpression = '';

    let firstElement = true;

    LOCALE_CONFIG.availableLanguages.forEach((element) => {
      if (!firstElement) {
        regularExpression += '|';
      }
      regularExpression += `^${element}$`;
      firstElement = false;
    });

    return regularExpression;
  }
}
