import { Component } from '@angular/core';
import { Helper } from '../_helpers/utils';

@Component({
  selector: 'app-accesibility',
  templateUrl: './accesibility.component.html'
})
export class AccesibilityComponent {

  appURL: string;

  constructor() {
    this.appURL = Helper.getAPPURL();
  }

}
