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
    authorizationUri: 'http://localhost:8080/auth/realms/umasio/protocol/openid-connect/auth',
    userInfoUri: 'http://localhost:8080/auth/realms/umasio/protocol/openid-connect/userinfo',
    tokenUri: 'http://localhost:8080/auth/realms/umasio/protocol/openid-connect/token',
    logout: 'http://localhost:8080/auth/realms/umasio/protocol/openid-connect/logout',
  }
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
