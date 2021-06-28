import { environment } from '../environments/environment';

export class OAuth {
  clientId: string;
  secret: string;
}

export class LocaleConfiguration {
  fallbackLocale: string;
  availableLanguages: string[];
}

export const BASE_APP_URL = environment.appUrl;

export const BASE_URL = environment.urlBase;

export const BASE_IMPORTER_URL = environment.urlImporterBase;

export const KEYCLOACK = environment.keycloak;

export const SKIPORT = environment.skipPort;

export const LPDURL = environment.lpdUrl;

export const WEBSOCKET_URL = environment.urlWebsocket;

export const SGI = environment.sgi;

export const OAUTH: OAuth = {
  clientId: environment.oauthClientId,
  secret: environment.oauthSecret,
};

export const LOCALE_CONFIG: LocaleConfiguration = {
  fallbackLocale: 'en',
  availableLanguages: ['es', 'en', 'en_US'],
};
