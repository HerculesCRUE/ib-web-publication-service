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
      disabled: false
    },
    {
      title: 'home.scientist',
      iconName: 'oi-person',
      iconCircle: false,
      url: '../categories/scientist',
      disabled: false
    },
    {
      title: 'home.category-inves',
      iconName: 'oi-folder',
      iconCircle: false,
      url: '../categories/research-categories',
      disabled: false
    },
    {
      title: 'home.prod-scientist',
      iconName: 'oi-box',
      iconCircle: false,
      url: null,
      disabled: true
    },
    {
      title: 'home.acction-inves',
      iconName: 'oi-pencil',
      iconCircle: false,
      url: '../categories/investigation-actions',
      disabled: false
    },
    {
      title: 'home.stats',
      iconName: 'oi-bar-chart',
      iconCircle: false,
      url: null,
      disabled: true
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
      disabled: false
    },
    {
      title: 'home.users',
      iconName: 'oi-person',
      iconCircle: false,
      url: null,
      disabled: true
    },
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
      disabled: false
    },
    {
      title: 'home.info-URI',
      iconName: 'oi-link-intact',
      iconCircle: false,
      url: null,
      disabled: true
    },
    {
      title: 'home.validators',
      iconName: 'oi-circle-check',
      iconCircle: false,
      url: null,
      disabled: true
    },
    {
      title: 'home.sgi',
      iconName: 'oi-hard-drive',
      iconCircle: false,
      url: null,
      disabled: true
    },
    {
      title: 'home.graphs',
      iconName: 'oi-pie-chart',
      iconCircle: false,
      url: null,
      disabled: true
    },
    {
      title: 'home.info-hercules',
      iconName: 'oi-info',
      iconCircle: true,
      url: null,
      disabled: true
    },
    {
      title: 'home.contact',
      iconName: 'oi-map',
      iconCircle: false,
      url: null,
      disabled: true
    },
  ]
}];

