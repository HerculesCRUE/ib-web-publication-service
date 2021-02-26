export const environment = {
  production: true,
  urlBase: 'http://herc-iz-front-desa.atica.um.es:8080',
  urlWebsocket: '/gs-guide-websocket',
  oauthClientId: 'acme',
  oauthSecret: 'acmesecret',
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
