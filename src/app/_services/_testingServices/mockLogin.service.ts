import { Injectable } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';
import { observable, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakInstance } from 'keycloak-js';
import { AbstractService } from 'src/app/_helpers/abstract';
import { Helper } from 'src/app/_helpers/utils';
import { User } from 'src/app/_models/user';

/**
 * Servicio para la gestión del login.
 */
@Injectable({
  providedIn: 'root',
})
export class MockLoginService extends AbstractService {
  /**
   * Flag que indica si el usuario se encuentra logado.
   */
  private loggedIn = false;
  keycloakAuth: KeycloakService = new KeycloakService();
  keycloakAuthInstance: KeycloakInstance;
  token: Promise<string>;
  keycloakcdata: any;
  keycloak;
  constructor(private httpClient: HttpClient) {
    super();

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
        url: 'http://localhost:8080/auth',
        realm: 'umasio',
        clientId: 'login-app'
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

  /**
   * Realiza el login del usuario. El login es con el theme local
   * para obtener el token y almacenarlo
   * @param username Nombre de usuario.
   * @param password  Contraseña.
   * @returns Observable con el resultado de la llamada.
   */
  login(username, password): Observable<Response> {
    const data = `grant_type=password&username=${username}&password=${password}`;

    return this.httpClient.post(Helper.getUrl('/oauth/token'), data).pipe(
      map((response: any) => {
        if (response) {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);
          localStorage.setItem('username', username);

          this.loggedIn = true;
        }

        return response;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Realiza el refresco de los datos de login.
   * @returns con el resultado de la llamada.
   */
  refreshToken(): Observable<Response> {
    const refreshToken: string = localStorage.getItem('refresh_token');

    if (refreshToken != null) {
      const data = `grant_type=refresh_token&refresh_token=${refreshToken}`;

      return this.httpClient.post(Helper.getUrl('/oauth/token'), data).pipe(
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

    return of({});
  }


}
