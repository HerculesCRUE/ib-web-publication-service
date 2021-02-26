export const environment = {
  production: true,
  urlBase: 'http://localhost:8787',
  urlWebsocket: '/gs-guide-websocket',
  oauthClientId: 'acme',
  oauthSecret: 'acmesecret',
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
