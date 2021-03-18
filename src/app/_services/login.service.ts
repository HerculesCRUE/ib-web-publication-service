import { Injectable } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';
import { Helper } from '../_helpers/utils';
import { Observable } from 'rxjs';
import { AbstractService } from '../_helpers/abstract';
import { User } from '../_models/user';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { KEYCLOACK } from '../configuration';

/**
 * Servicio para la gestión del login.
 */
@Injectable({
  providedIn: 'root',
})
export class LoginService extends AbstractService {
  /**
   * Flag que indica si el usuario se encuentra logado.
   */
  private loggedIn = false;
  token: Promise<string>;

  constructor(private httpClient: HttpClient) {
    super();
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

    this.httpClient.post(KEYCLOACK.logout + '?redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fmain%2F', {})
      .subscribe(data => {
      });
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
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        client_id: 'login-app',
        scope: 'openid',
        username: user,
        password
      }
    });

    return this.httpClient.post(KEYCLOACK.tokenUri, params, httpOptions)
      .pipe(tap((response: any) => {

      }));
  }


  /**
   *
   *
   * @return {*}  {Observable<any>}
   * @memberof LoginService
   */
  logoutKC(): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',

      })
    };

    const params = new HttpParams({
      fromObject: {
        client_id: 'login-app',
        refresh_token: localStorage.getItem('refresh_token')
      }
    });

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    return this.httpClient.post(KEYCLOACK.logout, params, httpOptions)
      .pipe(tap((response: any) => {

      }));
  }

  /**
   *
   *
   * @return {*} 
   * @memberof LoginService
   */
  tokenKC() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: localStorage.getItem('access_token')
      })
    };



    return this.httpClient.get(KEYCLOACK.userInfoUri, httpOptions)
      .pipe(tap((response: any) => {

      }));
  }


  /**
   *
   *
   * @return {*} 
   * @memberof LoginService
   */
  checkIsValidToken() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };

    const params = new HttpParams({
      fromObject: {
        grant_type: 'refresh_token',
        client_id: 'login-app',
        refresh_token: localStorage.getItem('refresh_token')
      }
    });

    return this.httpClient.post(KEYCLOACK.tokenUri, params, httpOptions)
      .pipe(tap((response: any) => {

      }));
  }

  /**
   *
   *
   * @return {*} 
   * @memberof LoginService
   */
  keycloakIsActive(): Observable<any> {
    return this.httpClient.get(Helper.getUrl('/keycloak/isActive'));
  }

}
