import { Component, OnInit } from '@angular/core';
import { HomeGroupItem } from '../_models/home';
import { HomeService } from '../_services/home.service';
import { TranslateHelperService } from '../_services/translate-helper.service';

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

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getHome().then((groupItems: HomeGroupItem[]) => {
      this.groupItems = groupItems;
    });
  }


}
