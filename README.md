![](./images/logos_feder.png)



| Entregable     | Servicio de publicación web                                  |
| -------------- | ------------------------------------------------------------ |
| Fecha          | 28/04/2021                                                   |
| Revisado por   | Paloma Terán Pérez                                           |
| Proyecto       | [ASIO](https://www.um.es/web/hercules/proyectos/asio) (Arquitectura Semántica e Infraestructura Ontológica) en el marco de la iniciativa [Hércules](https://www.um.es/web/hercules/) para la Semántica de Datos de Investigación de Universidades que forma parte de [CRUE-TIC](http://www.crue.org/SitePages/ProyectoHercules.aspx) |
| Módulo         | Servicio de publicación web - Web (frontend)                 |
| Tipo           | Software                                                     |
| Objetivo       | Servicio web encargado de la consulta de datos por parte de los usuarios |
| Estado         | **100%** de la pantallas del front.                          |
| Próximos pasos |                                                              |



# ASIO - Web publication service

|     | Master |
| --- | ------ |
| Quality Gate | [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?branch=develop&project=HerculesCRUE_ib-web-publication-service&metric=alert_status)](https://sonarcloud.io/dashboard?id=HerculesCRUE_ib-web-publication-service) |

Se trata del arquetipo para Front desarrollado en Angular.

## Características integradas

Dentro del proyecto base se integran las siguientes características:

- Frontend Angular 9.1

## Puesta en funcionamiento

1. npm install -> Descarga las librerías
2. npm run start -> pone en funcionamiento el servidor con la aplicación



## Testing y cobertura

[Testing](https://sonarcloud.io/component_measures?id=HerculesCRUE_ib-web-publication-service&metric=coverage&view=list)

## Yasgui

Se configura la llamada al servicio que nos devuelve los datos con la variable endpoint de yasgui de los ficheros de la carpeta "enviroments".

## Table results component

Es un componente común y genérico que muestra los datos recibidos en formato SparQL en formato tabla.

Funciona de dos formas:

- Paginación en cliente. Sólo se la mandan los datos usando el atributo data y con el formato de respuesta genérico de consultas SparQL a TripleStores (SparlqlResults) y como opcional headerData que contiene la información de las cabeceras.

  ```
  <app-table-results [data]="data"></app-table-results>
  ```

  

- Paginación en servidor. En este caso, el componente es más complejo y puede recibir los siguientes inputs y outputs:

  - data:  Input con los datos con el formato de respuesta genérico de consultas SparQL a TripleStores (SparlqlResults).
  
  - headerData: Array que contiene la información de las cabeceras. Optativo.
  
  - pageInfo: Input con la información de la páginación en formato Page, se utilizan los atributos:
    - number -> numero
    - size -> numero de elementos q se muestran en una pagina
    - totalElements -> numero total elementos sin la paginacion
  
- pageChanged: Output (Evento) con el nuevo número de página al que se quiere cambiar.
  
- routerField: Se utiliza para redireccionar una fila de la tabla usando nombre del campo que se envía.
  
  - sizeChanged: Output (Evento) con el nuevo tamaño de los elementos que se van a mostraren la tabla.
  
  - sortChanged: Output (Evento) con un objeto de tipo PageRequest, del que interesan los campos property y direction, que indica la nueva ordenación de los elementos de la tabla.
  
    
  
  ```
  <app-table-results [data]="allResearchmentStructuresFiltered.content[0]"
  
  ​    [pageInfo]="allResearchmentStructuresFiltered" [routerField]="'name'"
  
  ​    (pageChanged)="allResearchmentStructuresFilteredPageChanged($event)"

  ​    (sizeChanged)="allResearchmentStructuresFilteredSizeChanged($event)"
  
  ​    (sortChanged)="allResearchmentStructuresFilteredSortChanged($event)">
  
    </app-table-results>
  ```
  
  # enviroment variables
  para setear keycloack se deben configurar las siguientes variables

  - realm: 'umasio' - El nombre del real creado
  - clientId: 'login-app' - El client id que se creo
  - scope: 'openid, profile' - debería quedar as
  - authorizationGrantType: 'password' - tipo de autorización utilizamos password
  - authorizationUri: 'http://localhost:8080/auth/realms/umasio/protocol/openid-connect/auth',
  - userInfoUri: 'http://localhost:8080/auth/realms/umasio/protocol/openid-connect/userinfo',
  - tokenUri: 'http://localhost:8080/auth/realms/umasio/protocol/openid-connect/token',
  - logout: 'http://localhost:8080/auth/realms/umasio/protocol/openid-connect/logout' - Todas las URL de la api de keycloack

  - skipPort - Esta variable la avisa al language interceptor que puerto tiene keycloack para no adjuntarle los detalles de idioma a la petición al back
  