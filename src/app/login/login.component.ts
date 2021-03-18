import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Helper } from '../_helpers/utils';
import { LoginService } from '../_services/login.service';
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
  loginUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${Helper.getKeyCloackUrl().authorizationUri}?client_id=account&redirect_uri=${Helper.getKeyCloackUrl().redirectURL}&state=0%2Fea63479f-b2b6-4bd0-92a1-a6c3a5add14e&response_type=code&scope=openid`);
  constructor(
    private loginService: LoginService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginService.keycloakIsActive().subscribe(data => {
      if (data) {
        this.router.navigate(['./']);
      }
    });
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
        window.location.reload();
      }
    }, error => {
    });
  }






}
