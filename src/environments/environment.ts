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
  keycloak: {
    realm: 'umasio',
    clientId: 'login-app',
    clientSecret: 'd0ef8d7f-2c2d-4dec-8a8c-6623e07a0a52',
    scope: 'openid, profile',
    authorizationGrantType: 'password',
    authorizationUri: 'http://localhost:8080/auth/realms/umasio/protocol/openid-connect/auth',
    userInfoUri: 'http://localhost:8080/auth/realms/umasio/protocol/openid-connect/userinfo',
    tokenUri: 'http://localhost:8080/auth/realms/umasio/protocol/openid-connect/token',
    logout: 'http://localhost:8080/auth/realms/umasio/protocol/openid-connect/logout',
    jwkSetUri: 'http://localhost:8080/auth/realms/umasio/protocol/openid-connect/certs',
    certsId: 'hHfpcRM37HXnMGc3PDiwoPQLUNfHOmbj2EOjq0GFjg0'
  }
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

