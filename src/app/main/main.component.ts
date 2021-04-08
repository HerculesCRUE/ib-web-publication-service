import { Component, OnInit } from '@angular/core';
import { KeycloakInstance } from 'keycloak-js';
import { KEYCLOACK } from '../configuration';
import { Helper } from '../_helpers/utils';
import { LoginService } from '../_services/login.service';
import { TranslateHelperService } from '../_services/translate-helper.service';

/**
 * Componente principal. Se trata del componente padre
 * de todos componentes privados de la aplicación.
 *
 * Contiene un layout específico que incluye el menú de la aplicación.
 */
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  /**
   * Indica si el menú está colapsado.
   */
  isMenuCollapsed = false;
  /**
   *
   *
   * @type {KeycloakInstance}
   * @memberof MainComponent
   */
  keycloakAuth: KeycloakInstance;
  /**
   *
   *
   * @type {boolean}
   * @memberof MainComponent
   */
  isLogged: boolean;
  constructor(
    public translateHelperService: TranslateHelperService,
    private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.keycloakIsActive().subscribe(data => {
      this.isLogged = data;
    });
  }
  /**
   * Abre y cierra el menú.
   */
  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  /**
   * Realiza el logout del usuario.
   */
  logout() {
    /* this.loginService.logoutKC().subscribe(data => {
       this.windowReload();
     });*/
    const config = {
      url: Helper.getKeyCloackUrl().authUrl,
      realm: Helper.getKeyCloackUrl().realm,
      clientId: Helper.getKeyCloackUrl().clientId
    };
    // @ts-ignore
    this.keycloakAuth = new Keycloak(config);
    this.keycloakAuth.init({ onLoad: 'login-required' }).then(() => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('username');
      const options = {
        redirectUri: KEYCLOACK.redirectUrl
      };
      console.log(this.keycloakAuth);
      this.keycloakAuth.logout(options).then(data => {
        console.log(data);
      });
    });
  }

  windowReload() {
    window.location.reload();
  }
}
