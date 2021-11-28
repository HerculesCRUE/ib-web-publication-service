// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlBase: 'http://localhost:18787',
  oauthUrl: '',
  urlWebsocket: '/gs-guide-websocket',
  oauthClientId: 'acme',
  oauthSecret: 'acmesecret',
  skipPort: '8080',
  node: 'um',
  domain: 'ldpld1.um.es',
  spoon: 'http://localhost/web-spoon/spoon/spoon',
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
    redirectUrl: 'https%3A%2F%2Flocalhost%3A8080%2Fauth%2Frealms%2Fumasio%2Faccount%2Flogin-redirect',
    clientSecret: ''
  },
  importer: {
    baseUrl: 'http://localhost',
    port: '9320'
  },
  discovery: {
    baseUrl: 'http://localhost',
    port: '9327'
  },
  serviceDiscovery: {
    baseUrl: 'http://localhost',
    port: '9329'
  },
  federation: {
    baseUrl: 'http://localhost',
    port: '9328'
  },
  urisFactory: {
    baseUrl: 'http://localhost',
    port: '9326'
  },
  lpdUrl: 'http://localhost:8080/',
  appUrl: 'http://localhost:4200',
  sgi: 'https://github.com/HerculesCRUE/ib-asio-docs-/tree/master/13-Backend_SGI_Software',
  mail: {
    to: "daniel.ruiz.eng@gmail.com",
    subject: "Solicitud de borrado",
    message: "Es necesario restaurar los datos a fecha //date//\n\nPuede consultar los pasos necesarios en el manual de backups:\nhttps://git.izertis.com/universidaddemurcia/semantmurc/asio-docs/-/blob/master/00-Arquitectura/backups_y_restauraciones/Manual%20de%20backups%20y%20restauraciones%20del%20sistema.md\n\nUna vez realizado el borrado de los datos por favor, enviar un correo a //to//.\n\nGracias"
  }
};


// default settings for how to query the endpoint
export const yasgui = {
  // Wikibase:
  // endpoint: 'http://localhost:8282/proxy/wdqs/bigdata/namespace/wdq/sparql',
  // method: 'GET'

  // Fuseki
  endpoint: 'http://localhost:18787/trellis/sparql',
  method: 'POST',
  endpointFeder: 'http://localhost:18787/trellis/sparqlfeder',
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

