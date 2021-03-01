import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../_services/login.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { TranslateService } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';

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
    private router: Router,
    private translate: TranslateService,
    private toastr: ToastrService,
    private loginService: LoginService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loginService.logout();
  }

  logout() {
    this.loginService.logoutKeyCloak();
  }

  /**
   * Realiza el login del usuario.
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
