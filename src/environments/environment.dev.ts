export const environment = {
  production: true,
  urlBase: 'https://linkeddata1desa.um.es/api',
  urlWebsocket: '/gs-guide-websocket',
  oauthClientId: 'acme',
  oauthSecret: 'acmesecret',
  skipPort: '8080',
  node: 'um',
  domain: 'ldpld1.um.es',
  keycloak: {
    realm: 'umasio',
    clientId: 'login-app',
    scope: 'openid, profile',
    authorizationGrantType: 'password',
    authUrl: 'https://authld1desa.um.es/auth',
    authorizationUri: 'https://authld1desa.desa.um.es/auth/realms/umasio/protocol/openid-connect/auth',
    userInfoUri: 'https://authld1desa.desa.um.es/auth/realms/umasio/protocol/openid-connect/userinfo',
    tokenUri: 'https://authld1desa.desa.um.es/auth/realms/umasio/protocol/openid-connect/token',
    logout: 'https://authld1desa.desa.um.es/auth/realms/umasio/protocol/openid-connect/logout',
    redirectUrl: 'https%3A%2F%2Fauthld1desa.um.es%2Fauth%2Frealms%2Fumasio%2Faccount%2F%23%2Fpersonal-info',
    clientSecret: ''
  },
  importer: {
    baseUrl: 'https://linkeddata1desa.um.es/dataset',
    port: null
  },
  discovery: {
    baseUrl: 'https://linkeddata1desa.um.es/discovery',
    port: null
  },
  serviceDiscovery: {
    baseUrl: 'https://linkeddata1desa.um.es/service-discovery',
    port: null
  },
  federation: {
    baseUrl: 'https://linkeddata1desa.um.es/federation',
    port: null
  },
  urisFactory: {
    baseUrl: 'https://linkeddata1desa.um.es/uri-factory',
    port: null
  },
  lpdUrl: 'https://ldpld1desa.um.es/',
  appUrl: 'https://linkeddata1desa.um.es',
  sgi: 'https://github.com/HerculesCRUE/ib-asio-docs-/tree/master/13-Backend_SGI_Software'
};

// default settings for how to query the endpoint
export const yasgui = {
  // Wikibase:
  // endpoint: 'http://herc-iz-front-desa.atica.um.es/proxy/wdqs/bigdata/namespace/wdq/sparql',
  // method: 'GET'

  // Fuseki
  endpoint: 'https://linkeddata1desa.um.es/api/trellis/sparql',
  method: 'POST',
  endpointFeder: 'https://linkeddata1desa.um.es/api/trellis/sparql',
  methodFeder: 'POST',
};
