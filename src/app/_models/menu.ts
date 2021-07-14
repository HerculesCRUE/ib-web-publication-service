/**
 * Definición de un Item del menú.
 */
export class MenuItem {
  /**
   * Título del menú.
   */
  title: string;
  /**
   * Icono.
   */
  icon: string;
  /**
   * URL.
   */
  url: string;
  /**
   * Disabled.
   */
  disabled: boolean;
}

/**
 * Definición de los Items de menú
 */
export const MENU_ITEMS: MenuItem[] = [
  {
    title: 'menu.home',
    icon: 'oi-home',
    url: '/main/home',
    disabled: false
  },
  /*
  {
    title: 'menu.users',
    icon: '',
    url: '/main/users'
  },
  */
  {
    title: 'menu.university',
    icon: 'oi-project',
    url: '/main/categories/researchmentStructures',
    disabled: false
  },
  {
    title: 'menu.scientist',
    icon: 'oi oi-person',
    url: '/main/categories/scientist',
    disabled: false
  },
  {
    title: 'menu.areas',
    icon: 'oi oi-folder',
    url: '/main/categories/areas',
    disabled: false
  },
  {
    title: 'menu.prod-scientist',
    icon: 'oi oi-box',
    url: '/main/categories/scientific-production',
    disabled: false
  },
  {
    title: 'menu.acction-inves',
    icon: 'oi oi-pencil',
    url: '/main/categories/investigation-actions',
    disabled: false
  },
  {
    title: 'menu.stats',
    icon: 'oi-bar-chart',
    url: '/main/categories/statistics',
    disabled: false
  },
  {
    title: 'menu.discovery',
    icon: 'oi-zoom-in',
    url: '/main/discovery',
    disabled: false
  },
  {
    title: 'menu.uris-factory',
    icon: 'oi-globe',
    url: '/main/uris-factory',
    disabled: false
  },
  {
    title: 'menu.service-discovery',
    icon: 'oi-cloud',
    url: '/main/service-discovery',
    disabled: false
  },
  {
    title: 'menu.sparql',
    icon: 'oi-terminal',
    url: '/main/sparql',
    disabled: false
  },
  {
    title: 'menu.import-data',
    icon: 'oi-loop-circular',
    url: '/main/data-importer',
    disabled: false
  },
  {
    title: 'menu.validator',
    icon: 'oi-circle-check',
    url: '/main/validator',
    disabled: false
  },
  {
    title: 'menu.ldp',
    icon: 'oi-book',
    url: '/main/ldp',
    disabled: false
  }

];
