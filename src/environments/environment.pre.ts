export const environment = {
    production: true,
    urlBase: 'https://linkeddata1.um.es/api',
    urlImporterBase: 'http://data.importer.um.es',
    urlWebsocket: '/gs-guide-websocket',
    oauthClientId: 'acme',
    oauthSecret: 'acmesecret',
    skipPort: '8080',
    domain: 'ldpld1.um.es',
    keycloak: {
        realm: 'umasio',
        clientId: 'login-app',
        scope: 'openid, profile',
        authorizationGrantType: 'password',
        authUrl: 'https://authld1.um.es/auth',
        authorizationUri: 'https://authld1.um.es/auth/realms/umasio/protocol/openid-connect/auth',
        userInfoUri: 'https://authld1.um.es/auth/realms/umasio/protocol/openid-connect/userinfo',
        tokenUri: 'https://authld1.um.es/auth/realms/umasio/protocol/openid-connect/token',
        logout: 'https://authld1.um.es/auth/realms/umasio/protocol/openid-connect/logout',
        redirectUrl: 'https%3A%2F%2Fauthld1.um.es%2Fauth%2Frealms%2Fumasio%2Faccount%2F%23%2Fpersonal-info',
        clientSecret: ''
    },
    discovery: {
        baseUrl: 'http://herc-iz-back-prod.atica.um.es',
        port: '9327'
    },
    serviceDiscovery: {
        baseUrl: 'http://host.docker.internal',
        port: '8089'
    },
    federation: {
        baseUrl: 'http://herc-iz-back-prod.atica.um.es',
        port: '9328'
    },
    urisFactory: {
        baseUrl: 'http://herc-iz-back-prod.atica.um.es',
        port: '8321'
    },
    lpdUrl: 'https://ldpld1.um.es/',
    appUrl: 'https://linkeddata1.um.es',
    sgi: 'https://github.com/HerculesCRUE/ib-asio-docs-/tree/master/13-Backend_SGI_Software'
};

// default settings for how to query the endpoint
export const yasgui = {
    // Wikibase:
    // endpoint: 'http://herc-iz-front-desa.atica.um.es/proxy/wdqs/bigdata/namespace/wdq/sparql',
    // method: 'GET'

    // Fuseki
    endpoint: 'https://linkeddata1.um.es/api/trellis/sparql',
    method: 'POST',
    endpointFeder: 'https://linkeddata1.um.es/api/trellis/sparql',
    methodFeder: 'POST',
};
