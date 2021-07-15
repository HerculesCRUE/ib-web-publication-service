import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-etl',
  templateUrl: './etl.component.html',
  styleUrls: ['./etl.component.css'],
})
export class EtlComponent {

  url: string = environment.spoon;
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
