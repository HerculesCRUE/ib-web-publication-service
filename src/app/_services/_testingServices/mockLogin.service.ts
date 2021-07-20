import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakInstance } from 'keycloak-js';
import { User } from 'src/app/_models/user';

/**
 * Servicio para la gestión del login.
 */
@Injectable({
  providedIn: 'root',
})
export class MockLoginService {
  /**
   * Flag que indica si el usuario se encuentra logado.
   */
  private loggedIn = false;
  keycloakAuth: KeycloakService = new KeycloakService();
  keycloakAuthInstance: KeycloakInstance;
  token: Promise<string>;
  keycloakcdata: any;
  keycloak;
  constructor() {
  }






  /**
   * Obtiene los datos del usuario actual.
   * @returns datos del usuario actual.
   */
  getCurrentUser(): User {
    return JSON.parse(localStorage.getItem('current_user'));
  }

  /**
   * Realiza el logout del usuario.
   */
  logout() {
    localStorage.removeItem('access_token');
    this.loggedIn = false;
  }

  /**
   * Indica si el usaurio está logado.
   */
  isLoggedIn() {
    return this.loggedIn;
  }

  /**
   *
   * Este logout se utiliza para los usuarios logueados mediante keycloack
   * @memberof LoginService
   */
  logoutKeyCloak() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    this.loggedIn = false;
    return of({});
  }

  getName() {
    return of({});
  }
  getLoggedUsername() {
    return of({});
  }
  /**
   *
   * Login que se utiliza para theme local y conexion a 
   * keycloack para obtener token y almacenarlo
   * @param {*} user
   * @param {*} password
   * @return {*} 
   * @memberof LoginService
   */
  loginKC(user, password) {
    return of({});
  }

  /**
   *
   *
   * @return {*} 
   * @memberof MockLoginService
   */
  logoutKC() {
    return of({});
  }


  /**
   *
   *
   * @return {*} 
   * @memberof MockLoginService
   */
  keycloakIsActive() {
    return of(true);
  }

  keycloakIsAdmin() {
    return of(true);
  }

}
