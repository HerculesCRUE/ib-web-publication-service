import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-etl',
  templateUrl: './etl.component.html',
  styleUrls: ['./etl.component.css'],
})
export class EtlComponent {

  url: string = "https://linkeddata1.um.es/web-spoon/spoon/spoon";
  urlSafe: SafeResourceUrl;
  public screenWidth: any;
  public screenHeight: any;

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    this.screenWidth = window.innerWidth;
    console.log('screenWidth', this.screenWidth);
    this.screenHeight = window.innerHeight;
    console.log('screenHeight', this.screenHeight);
  }

}
