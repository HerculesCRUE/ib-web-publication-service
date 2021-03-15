import { Component, OnInit } from '@angular/core';
import Yasgui from '@triply/yasgui';
import Yasqe from '@triply/yasqe';
import { yasgui } from '../../environments/environment';
import { NgForm } from '@angular/forms';
import { LoginService } from '../_services/login.service';
@Component({
  selector: 'app-sparqleditor',
  templateUrl: './sparqleditor.component.html'
})
export class SPARQLEditorComponent implements OnInit {

  yasqe: any;
  jsonData: any = null;
  errorMessage: any;
  federatedItem = false;
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.keycloakIsActive().subscribe(data => {
      this.federatedItem = data;
    });
    Yasgui.defaults.requestConfig.endpoint = yasgui.endpoint;
    if (localStorage.getItem('access_token')) {
      Yasgui.defaults.requestConfig.headers = {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      };
    } else {
      Yasgui.defaults.requestConfig.headers = {};
    }

    Yasgui.defaults.requestConfig.method =
      yasgui.method === 'GET' ? 'GET' : 'POST';

    this.yasqe = new Yasgui.Yasqe(document.getElementById('yasgui'));


    this.yasqe.on('queryResponse', (instance: Yasqe, req: any) => {
      this.onQueryResponse(req);
    });
  }

  federChangeCheck(value: boolean): void {
    if (value === true) {
      this.yasqe.config.requestConfig.endpoint = yasgui.endpointFeder;
      this.yasqe.config.requestConfig.method =
        yasgui.methodFeder === 'GET' ? 'GET' : 'POST';
    } else {
      this.yasqe.config.requestConfig.endpoint = yasgui.endpoint;
      this.yasqe.config.requestConfig.method =
        yasgui.method === 'GET' ? 'GET' : 'POST';

    }
  }


  // When Yasgui gets the results
  onQueryResponse(data: any) {
    if (data.hasOwnProperty('text')) {
      this.errorMessage = null;
      this.jsonData = JSON.parse((data as any).text);
    } else if (data.hasOwnProperty('response')) {
      if (data.response.status === 400) {
        this.errorMessage = (data as any).response.text;
        this.jsonData = null;
      }
    }
  }



}
