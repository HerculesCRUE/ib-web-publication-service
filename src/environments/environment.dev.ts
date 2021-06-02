export const environment = {
  production: true,
  urlBase: 'http://localhost:8787',
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
    redirectUrl: 'https%3A%2F%2Fherculesasioizertis.desa.um.es%2Fauth%2Frealms%2Fumasio%2Faccount%2F%23%2Fpersonal-info',
    clientSecret: ''
  },
  lpdUrl: 'https://ldp.herculesasioizertis.desa.um.es',
  appUrl: 'https://app.herculesasioizertis.desa.um.es',
  sgi: 'https://github.com/HerculesCRUE/ib-asio-docs-/tree/master/13-Backend_SGI_Software'
};

// default settings for how to query the endpoint
export const yasgui = {
  // Fuseki
  // https://query.wikidata.org/sparql
  // endpoint: 'http://localhost:3030/trellis/sparql',
  endpoint: 'http://localhost:8787/trellis/sparql',
  method: 'POST',
  endpointFeder: 'http://localhost:8787/trellis/sparql',
  methodFeder: 'POST',
};
