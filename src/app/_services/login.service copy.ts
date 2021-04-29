import { Injectable } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';
import { Helper } from '../_helpers/utils';
import { Observable, of } from 'rxjs';
import { AbstractService } from '../_helpers/abstract';
import { User } from '../_models/user';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakInstance } from 'keycloak-js';
import * as Keycloak from 'keycloak-js';

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
  keycloakAuth: KeycloakInstance;
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
   *
   * @return {*}  {Observable<any>}
   * @memberof LoginService
   */
  logoutKC() {

    const config = {
      url: Helper.getKeyCloackUrl().authUrl,
      realm: Helper.getKeyCloackUrl().realm,
      clientId: Helper.getKeyCloackUrl().clientId
    };
    // @ts-ignore
    this.keycloakAuth = new Keycloak(config);
    this.keycloakAuth.init({}).then(() => { });
    const config1 = {
      redirectUri: Helper.getAPPURL(),
    };
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    this.keycloakAuth.logout(config1).then(() => { });

  }

  encode(url) {
    return encodeURIComponent(url).replace(/'/g, '%27').replace(/"/g, '%22');
  }




  windowReload() {
    window.location.replace('./');
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



    return this.httpClient.get(Helper.getKeyCloackUrl().userInfoUri, httpOptions)
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

    return this.httpClient.post(Helper.getKeyCloackUrl().tokenUri, params, httpOptions);
  }


  refreshToken(): Observable<Response> {
    const refreshToken: string = localStorage.getItem('refresh_token');
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

    if (refreshToken != null) {
      // console.log('Refreshing with token: ' + refreshToken);
      // const data = 'grant_type=refresh_token&refresh_token=' + refreshToken;

      return this.httpClient.post(Helper.getKeyCloackUrl().tokenUri, params, httpOptions).pipe(
        map((response: any) => {
          if (response != null) {
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('refresh_token', response.refresh_token);
          }

          return response;
        }),
        catchError(this.handleError)
      );
    }

    return of();
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

  keycloakIsAdmin(): Observable<any> {
    return this.httpClient.get(Helper.getUrl('/keycloak/isAdmin'));
  }



}
