import { Component, OnInit } from '@angular/core';
import { HomeGroupItem } from '../_models/home';
import { HomeService } from '../_services/home.service';
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
  isMenuTransitioning = false;
  /**
   *
   *
   * @type {boolean}
   * @memberof MainComponent
   */
  isLogged: boolean;
  groupItems: HomeGroupItem[];
  constructor(
    public translateHelperService: TranslateHelperService,
    private loginService: LoginService,
    private homeService: HomeService) { }

  ngOnInit() {
    this.loginService.keycloakIsActive().subscribe(data => {
      this.isLogged = data;
    });

    this.homeService.getHome().then((groupItems: HomeGroupItem[]) => {
      this.groupItems = groupItems;
    });
  }
  /**
   * Abre y cierra el menú.
   */
  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this.isMenuTransitioning = true;
    setTimeout(() => {
      this.isMenuTransitioning = false;
    }, 250); // collapsing transition time (layoutUMU.css -> .sidebar { transition: all .25s linear; })
  }

  /**
   * Realiza el logout del usuario.
   */
  logout() {
    this.loginService.logoutKC();
  }

  /**
   *
   *
   * @memberof MainComponent
   */
  windowReload() {
    window.location.reload();
  }
}
