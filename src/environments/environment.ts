// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlBase: 'http://localhost:8787',
  oauthUrl: '',
  urlWebsocket: '/gs-guide-websocket',
  oauthClientId: 'acme',
  oauthSecret: 'acmesecret',
  skipPort: '8080',
  keycloak: {
    realm: 'umasio',
    clientId: 'login-app',
    scope: 'openid, profile',
    authorizationGrantType: 'password',
    authUrl: 'http://localhost:8080/auth',
    authorizationUri: 'http://localhost:8080/auth/realms/umasio/protocol/openid-connect/auth',
    userInfoUri: 'http://localhost:8080/auth/realms/umasio/protocol/openid-connect/userinfo',
    tokenUri: 'http://localhost:8080/auth/realms/umasio/protocol/openid-connect/token',
    logout: 'http://localhost:8080/auth/realms/umasio/protocol/openid-connect/logout',
    redirectUrl: 'http%3A%2F%2Flocalhost%3A8080%2Fauth%2Frealms%2Fumasio%2Faccount%2Flogin-redirect',
    clientSecret: ''
  },
  lpdUrl: 'http://localhost:8080/',
  appUrl: 'http://localhost:4200',
  sgi: 'https://github.com/HerculesCRUE/ib-asio-docs-/tree/master/13-Backend_SGI_Software'
};


// default settings for how to query the endpoint
export const yasgui = {
  // Wikibase:
  // endpoint: 'http://localhost:8282/proxy/wdqs/bigdata/namespace/wdq/sparql',
  // method: 'GET'

  // Fuseki
  endpoint: 'http://localhost:8787/trellis/sparql',
  method: 'POST',
  endpointFeder: 'http://localhost:8787/trellis/sparqlfeder',
  methodFeder: 'POST',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 *
 * import 'zone.js/dist/zone-error';  // Included with Angular CLI.
 */

