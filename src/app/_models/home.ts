import { Helper } from "../_helpers/utils";

/**
 * Definición de un grupo del home.
 */
export class HomeGroupItem {
  /**
   * Título del item de home.
   */
  title: string;
  /**
   * Items
   */
  homeItems: HomeItem[];

}

/**
 * Definición de un Item del home.
 */
export class HomeItem {
  /**
   * Título del item de home.
   */
  title: string;
  /**
   *
   *
   * @type {string}
   * @memberof HomeItem
   */
  iconName: string;
  /**
   * Icon circle.
   */
  iconCircle: boolean;
  /**
   * URL.
   */
  url: string;
  urlExterna: string;

  /**
   *
   * Disabled option
   */
  disabled: boolean;
}

/**
 * Definición de los Items de  la home
 */
export const HOME_ITEMS: HomeGroupItem[] = [{
  title: 'home.category',
  homeItems: [
    {
      title: 'home.university',
      iconName: 'oi-project',
      iconCircle: false,
      url: '../categories/researchmentStructures',
      urlExterna: '',
      disabled: false
    },
    {
      title: 'home.scientist',
      iconName: 'oi-person',
      iconCircle: false,
      url: '../categories/scientist',
      disabled: false,
      urlExterna: ''
    },
    {
      title: 'home.areas',
      iconName: 'oi-folder',
      iconCircle: false,
      url: '../categories/areas',
      disabled: false,
      urlExterna: ''
    },
    {
      title: 'home.prod-scientist',
      iconName: 'oi-box',
      iconCircle: false,
      url: '../categories/scientific-production',
      disabled: false,
      urlExterna: ''
    },
    {
      title: 'home.acction-inves',
      iconName: 'oi-pencil',
      iconCircle: false,
      url: '../categories/investigation-actions',
      disabled: false,
      urlExterna: ''
    },
    {
      title: 'home.stats',
      iconName: 'oi-bar-chart',
      iconCircle: false,
      url: '../categories/statistics',
      disabled: false,
      urlExterna: ''
    }
  ]
},
{
  title: 'home.service',
  homeItems: [
    {
      title: 'home.sparql',
      iconName: 'oi-terminal',
      iconCircle: false,
      url: '/main/sparql',
      disabled: false,
      urlExterna: ''
    },
    {
      title: 'home.users',
      iconName: 'oi-person',
      iconCircle: false,
      url: '',
      disabled: false,
      urlExterna: Helper.getKeyCloackUrl().authUrl + '/admin/'
    },
    {
      title: 'home.import-data',
      iconName: 'oi-loop-circular',
      iconCircle: false,
      url: '/main/data-importer',
      disabled: false,
      urlExterna: ''
    },
    {
      title: 'home.information',
      iconName: 'oi-info',
      iconCircle: false,
      url: '/main/info',
      disabled: false,
      urlExterna: ''
    },
    {
      title: 'home.links',
      iconName: 'oi-external-link',
      iconCircle: false,
      url: '/main/links',
      disabled: false,
      urlExterna: ''
    },
    {
      title: 'home.validator',
      iconName: 'oi-circle-check',
      iconCircle: false,
      url: '/main/validator',
      disabled: false,
      urlExterna: ''
    }
  ]
},
{
  title: 'home.info',
  homeItems: [
    {
      title: 'links.repository',
      iconName: 'oi-cloud-upload',
      iconCircle: false,
      url: '/main/links',
      disabled: false,
      urlExterna: ''
    },
    {
      title: 'menu.accessibility',
      iconName: 'oi-eye',
      iconCircle: false,
      url: '/main/accessibility',
      disabled: false,
      urlExterna: ''
    },
    {
      title: 'menu.contact',
      iconName: 'oi-enveloped-closed',
      iconCircle: false,
      url: '/main/contact',
      disabled: false,
      urlExterna: ''
    },
    {
      title: 'menu.graph',
      iconName: 'oi-enveloped-graph',
      iconCircle: false,
      url: '/main/contact',
      disabled: false,
      urlExterna: ''
    },
    {
      title: 'home.info-LPD',
      iconName: 'oi-link-intact',
      iconCircle: false,
      url: '',
      disabled: false,
      urlExterna: Helper.getLPDUrl()
    },
    {
      title: 'home.info-URI',
      iconName: 'oi-link-intact',
      iconCircle: false,
      url: '',
      disabled: false,
      urlExterna: 'https://github.com/HerculesCRUE/ib-asio-docs-/blob/a3e838e9944faac26957cc1944b468f65596a2c9/09-Buenas_pr%C3%A1cticas_para_URIs_H%C3%A9rcules/ASIO_Izertis_Contrato_BuenasPracticasParaURIsHercules.md'
    },
    {
      title: 'home.validators',
      iconName: 'oi-circle-check',
      iconCircle: false,
      url: '',
      disabled: true,
      urlExterna: 'https://github.com/HerculesCRUE/ib-asio-docs-/tree/master/23-Librer%C3%ADa_de_validación_de_RDF'
    },
    {
      title: 'home.sgi',
      iconName: 'oi-hard-drive',
      iconCircle: false,
      url: '',
      disabled: false,
      urlExterna: Helper.getLSgi()
    },
    {
      title: 'home.info-hercules',
      iconName: 'oi-info',
      iconCircle: true,
      url: '',
      disabled: false,
      urlExterna: 'https://www.um.es/web/hercules/sobre-hercules'
    }
  ]
}];

