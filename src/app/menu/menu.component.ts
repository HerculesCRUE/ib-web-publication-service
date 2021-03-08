import { Component, OnInit } from '@angular/core';
import { MenuService } from '../_services/menu.service';
import { MenuItem } from '../_models/menu';
import { LoginService } from '../_services/login.service';
import { Router } from '@angular/router';
import { TranslateHelperService } from '../_services/translate-helper.service';
import { KeycloakService } from 'keycloak-angular';

/**
 * Componente que muestra el menú de la aplicación.
 */
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],

})
export class MenuComponent implements OnInit {
  /**
   * Items del menú de la aplicación.
   */
  menuItems: MenuItem[];
  initKeycloack;

  constructor(
    public translateHelperService: TranslateHelperService,
    private router: Router,
    private menuService: MenuService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.menuService.getMenu().then((menuItems: MenuItem[]) => {
      this.menuItems = menuItems;
    });

  }

  /**
   * Realiza el logout del usuario.
   */
  logout() {
    this.loginService.logoutKC().subscribe(data => {
      console.log(data);
    }, e => {
      console.log(e);
    });
  }







}
