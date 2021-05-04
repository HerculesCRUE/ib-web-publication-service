import { Injectable } from '@angular/core';
import { HomeGroupItem, HOME_ITEMS } from '../_models/home';

/**
 * Servicio para gestionar el home de la aplicación.
 */
@Injectable({
  providedIn: 'root',
})
export class HomeService {

  /**
   * Obtiene los datos del home.
   * @returns Promesa con los items del home.
   */
  getHome(): Promise<HomeGroupItem[]> {
    return Promise.resolve(HOME_ITEMS);
  }
}
