import { Component, OnInit } from '@angular/core';
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

  constructor(
    private loginService: LoginService
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

      }
      console.log(response);
    }, error => {
      console.log('error', error);
    });
  }


}
