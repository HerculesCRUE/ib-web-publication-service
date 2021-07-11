export const environment = {
  production: true,
  urlBase: 'https://app.herculesasioizertis.desa.um.es/api',
  urlWebsocket: '/gs-guide-websocket',
  oauthClientId: 'acme',
  oauthSecret: 'acmesecret',
  skipPort: '8080',
  node: 'um',
  domain: 'ldp.herculesasioizertis.desa.um.es',
  keycloak: {
    realm: 'umasio',
    clientId: 'login-app',
    scope: 'openid, profile',
    authorizationGrantType: 'password',
    authUrl: 'https://herculesasioizertis.desa.um.es/auth',
    authorizationUri: 'https://herculesasioizertis.desa.um.es/auth/realms/umasio/protocol/openid-connect/auth',
    userInfoUri: 'https://herculesasioizertis.desa.um.es/auth/realms/umasio/protocol/openid-connect/userinfo',
    tokenUri: 'https://herculesasioizertis.desa.um.es/auth/realms/umasio/protocol/openid-connect/token',
    logout: 'https://herculesasioizertis.desa.um.es/auth/realms/umasio/protocol/openid-connect/logout',
    redirectUrl: 'https%3A%2F%2Fherculesasioizertis.desa.um.es%2Fauth%2Frealms%2Fumasio%2Faccount%2F%23%2Fpersonal-info',
    clientSecret: ''
  },
  importer: {
    baseUrl: 'http://herc-iz-back-desa.atica.um.es',
    port: '9320'
  },
  discovery: {
    baseUrl: 'http://herc-iz-back-desa.atica.um.es',
    port: '9327'
  },
  serviceDiscovery: {
    baseUrl: 'http://host.docker.internal',
    port: '8089'
  },
  federation: {
    baseUrl: 'http://herc-iz-back-desa.atica.um.es',
    port: '9328'
  },
  urisFactory: {
    baseUrl: 'http://herc-iz-back-desa.atica.um.es',
    port: '8080'
  },
  lpdUrl: 'https://ldp.herculesasioizertis.desa.um.es/',
  appUrl: 'https://app.herculesasioizertis.desa.um.es',
  sgi: 'https://github.com/HerculesCRUE/ib-asio-docs-/tree/master/13-Backend_SGI_Software'
};

// default settings for how to query the endpoint
export const yasgui = {
  // Wikibase:
  // endpoint: 'http://herc-iz-front-desa.atica.um.es/proxy/wdqs/bigdata/namespace/wdq/sparql',
  // method: 'GET'

  // Fuseki
  endpoint: 'https://app.herculesasioizertis.desa.um.es/api/trellis/sparql',
  method: 'POST',
  endpointFeder: 'https://app.herculesasioizertis.desa.um.es/api/trellis/sparql',
  methodFeder: 'POST',
};
