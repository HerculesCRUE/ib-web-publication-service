export const environment = {
    production: true,
    urlBase: 'https://app.linkeddata1test.um.es/api',
    urlImporterBase: 'http://localhost:9320',
    urlWebsocket: '/gs-guide-websocket',
    oauthClientId: 'acme',
    oauthSecret: 'acmesecret',
    skipPort: '8080',
    keycloak: {
        realm: 'umasio',
        clientId: 'login-app',
        scope: 'openid, profile',
        authorizationGrantType: 'password',
        authUrl: 'https://authld1test.um.es/auth',
        authorizationUri: 'https://authld1test.um.es/auth/realms/umasio/protocol/openid-connect/auth',
        userInfoUri: 'https://authld1test.um.es/auth/realms/umasio/protocol/openid-connect/userinfo',
        tokenUri: 'https://authld1test.um.es/auth/realms/umasio/protocol/openid-connect/token',
        logout: 'https://authld1test.um.es/auth/realms/umasio/protocol/openid-connect/logout',
        redirectUrl: 'https%3A%2F%2Fauthld1test.um.es%2Fauth%2Frealms%2Fumasio%2Faccount%2F%23%2Fpersonal-info',
        clientSecret: ''
    },
    lpdUrl: 'https://ldpld1test.um.es/',
    appUrl: 'https://app.linkeddata1test.um.es',
    sgi: 'https://github.com/HerculesCRUE/ib-asio-docs-/tree/master/13-Backend_SGI_Software'
};

// default settings for how to query the endpoint
export const yasgui = {
    // Wikibase:
    // endpoint: 'http://herc-iz-front-desa.atica.um.es/proxy/wdqs/bigdata/namespace/wdq/sparql',
    // method: 'GET'

    // Fuseki
    endpoint: 'https://app.linkeddata1test.um.es/api/trellis/sparql',
    method: 'POST',
    endpointFeder: 'https://app.linkeddata1test.um.es/api/trellis/sparql',
    methodFeder: 'POST',
};
