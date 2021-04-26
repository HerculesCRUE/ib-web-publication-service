import { Component, OnInit } from '@angular/core';
import { HomeGroupItem } from '../_models/home';
import { HomeService } from '../_services/home.service';
import { LoginService } from '../_services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  /**
   * Lista de categorias.
   */
  groupItems: HomeGroupItem[];

  /**
   * Categoria seleccionada.
   */
  category: string;
  isLogged: boolean;

  constructor(private homeService: HomeService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.keycloakIsActive().subscribe(data => {
      this.isLogged = data;
    });
    this.homeService.getHome().then((groupItems: HomeGroupItem[]) => {
      this.groupItems = groupItems;
    });
  }




}
