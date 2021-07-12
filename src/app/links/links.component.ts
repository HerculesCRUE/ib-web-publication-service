import { Component } from '@angular/core';
import { Helper } from '../_helpers/utils';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css'],
})
export class LinksComponent {

  sgi = Helper.getLSgi();

}
