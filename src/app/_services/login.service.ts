import { Injectable } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';
import { Helper } from '../_helpers/utils';
import { Observable, of, Subscriber } from 'rxjs';
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
  keycloackService: KeycloakInstance;
  constructor(private httpClient: HttpClient, private keycloakAuth: KeycloakService) {
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

    this.httpClient.post(Helper.getKeyCloackUrl().logout + '?redirect_uri=' + encodeURIComponent(Helper.getAPPURL()), {})
      .subscribe(data => {
        console.log(data);
      });
  }


  getName() {
    return this.httpClient
      .get(Helper.getUrl('/keycloak/getName')).pipe(
        catchError(this.handleError)
      );
  }

  getLoggedUsername(): Observable<string> {
    return new Observable((observer: Subscriber<string>) => {
      if (localStorage.getItem('access_token')) {
        if (!localStorage.getItem('user_name')) {
          this.getName().subscribe((name) => {
            observer.next(name.username);
          }, (error) => {
            observer.next(null);
          });
        } else {
          observer.next(localStorage.getItem('user_name'));
        }
      } else {
        observer.next(null);
      }
      return () => { };
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

    return this.httpClient.post(Helper.getKeyCloackUrl().tokenUri, params, httpOptions)
      .pipe(tap((response: any) => {
        console.log(response);
      }));
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
    this.keycloackService = new Keycloak(config);
    this.keycloackService.init({}).then((val) => console.log(val));
    const config1 = {
      redirectUri: Helper.getAPPURL(),
    };
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    this.keycloackService.logout(config1).then((val) => console.log(val));

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
        console.log(response);
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

  /**
   *
   *  Se usa solo si se quiere realiza el login 
   *  en la pantalla de keycloack
   * @memberof LoginService
   */
  loginKeycloack() {
    this.keycloakAuth.init({
      config: {
        url: Helper.getKeyCloackUrl().authUrl,
        realm: Helper.getKeyCloackUrl().realm,
        clientId: Helper.getKeyCloackUrl().clientId
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',
    });
    this.keycloakAuth.login();

  }

}
