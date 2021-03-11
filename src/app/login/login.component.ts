import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
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
  loginUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.keycloak.authorizationUri}?client_id=account&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Frealms%2Fumasio%2Faccount%2Flogin-redirect&state=0%2Fea63479f-b2b6-4bd0-92a1-a6c3a5add14e&response_type=code&scope=openid`);
  constructor(
    private loginService: LoginService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit(): void {

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
        this.router.navigate(['./']);
      }
    }, error => {
      console.log('error', error);
    });
  }






}
