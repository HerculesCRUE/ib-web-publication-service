export const environment = {
  production: true,
  urlBase: 'https://app.herculesasioizertis.desa.um.es/api',
  urlWebsocket: '/gs-guide-websocket',
  oauthClientId: 'acme',
  oauthSecret: 'acmesecret',
  skipPort: '8080',
  keycloak: {
    realm: 'umasio',
    clientId: 'login-app',
    scope: 'openid, profile',
    authorizationGrantType: 'password',
    authorizationUri: 'https://herculesasioizertis.desa.um.es/auth/realms/umasio/protocol/openid-connect/auth',
    userInfoUri: 'https://herculesasioizertis.desa.um.es/auth/realms/umasio/protocol/openid-connect/userinfo',
    tokenUri: 'https://herculesasioizertis.desa.um.es/auth/realms/umasio/protocol/openid-connect/token',
    logout: 'https://herculesasioizertis.desa.um.es/auth/realms/umasio/protocol/openid-connect/logout'
  }
};

// default settings for how to query the endpoint
export const yasgui = {
  // Wikibase:
  // endpoint: 'http://herc-iz-front-desa.atica.um.es/proxy/wdqs/bigdata/namespace/wdq/sparql',
  // method: 'GET'

  // Fuseki
  endpoint: 'http://herc-iz-front-desa.atica.um.es:8080/trellis/sparql',
  method: 'POST',
  endpointFeder: 'http://localhost:8787/trellis/sparql',
  methodFeder: 'POST',
};
