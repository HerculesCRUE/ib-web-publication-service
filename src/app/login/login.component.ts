import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakInstance } from 'keycloak-js';
import { Helper } from '../_helpers/utils';
import { LoginService } from '../_services/login.service';
import * as Keycloak from 'keycloak-js';
import { BASE_APP_URL } from '../configuration';
/**
 * Componente para la gestión del login.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  /**
   * Modelo de formulario.
   */
  model: any = {};
  /**
   *
   *
   * @memberof LoginComponent
   */
  loginUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${Helper.getKeyCloackUrl().authorizationUri}?client_id=account&redirect_uri=${Helper.getKeyCloackUrl().redirectUrl}&response_type=code&scope=openid`);
  keycloakAuth: KeycloakInstance;
  constructor(
    private loginService: LoginService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private keycloackService: KeycloakService

  ) { }

  ngOnInit(): void {
    this.loginService.keycloakIsActive().subscribe(data => {
      if (data) {
        this.router.navigate(['/main']);
      } else {
        const config = {
          url: Helper.getKeyCloackUrl().authUrl,
          realm: Helper.getKeyCloackUrl().realm,
          clientId: Helper.getKeyCloackUrl().clientId
        };
        // @ts-ignore
        this.keycloakAuth = new Keycloak(config);
        this.keycloakAuth.init({ onLoad: 'login-required' }).then(() => {
          const token = this.keycloakAuth.token;
          const refresh = this.keycloakAuth.refreshToken;
          localStorage.setItem('access_token', token);
          localStorage.setItem('refresh_token', refresh);
          this.redirect();

        });
      }
    }, error => {
      const config = {
        url: Helper.getKeyCloackUrl().authUrl,
        realm: Helper.getKeyCloackUrl().realm,
        clientId: Helper.getKeyCloackUrl().clientId
      };
      // @ts-ignore
      this.keycloakAuth = new Keycloak(config);
      this.keycloakAuth.init({ onLoad: 'login-required' }).then(() => {
        const token = this.keycloakAuth.token;
        const refresh = this.keycloakAuth.refreshToken;
        localStorage.setItem('access_token', token);
        localStorage.setItem('refresh_token', refresh);
        this.redirect();

      });
    });
  }

  loginck() {
    this.loginService.loginKeycloack();
  }

  redirect() {
    window.location.href = BASE_APP_URL + '/main/home';
  }

  /**
   *
   *  logout de sesión de keycloack
   * @memberof LoginComponent
   */
  logout() {
    this.loginService.logoutKeyCloak();
  }

  /**
   * Realiza el login del usuario.
   * y guarda las claves
   */
  login() {
    this.loginService.loginKC(this.model.username, this.model.password).subscribe(response => {
      if (response) {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        localStorage.setItem('username', this.model.username);
        this.windowReload();
      }
    }, error => {
    });



  }


  windowReload() {
    window.location.reload();
  }






}
