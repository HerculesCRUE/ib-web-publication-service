import { Component, OnInit } from '@angular/core';
import Yasgui from '@triply/yasgui';
import Yasqe from '@triply/yasqe';
import { yasgui } from '../../environments/environment';

@Component({
  selector: 'app-sparqleditor',
  templateUrl: './sparqleditor.component.html'
})
export class SPARQLEditorComponent implements OnInit {
  jsonData: any = null;
  errorMessage: any;

  constructor() { }

  ngOnInit(): void {
    Yasgui.defaults.requestConfig.endpoint = yasgui.endpoint;
    Yasgui.defaults.requestConfig.method =
      yasgui.method == 'GET' ? 'GET' : 'POST';

    const yasqe = new Yasgui.Yasqe(document.getElementById('yasgui'));

    yasqe.on('queryResponse', (instance: Yasqe, req: any) => {
      this.onQueryResponse(req);
    });
  }

  federChangeCheck(value: boolean): void {
    if (value == true) {
      Yasgui.defaults.requestConfig.endpoint = yasgui.endpointFeder;
      Yasgui.defaults.requestConfig.method =
        yasgui.methodFeder == 'GET' ? 'GET' : 'POST';
    } else {
      Yasgui.defaults.requestConfig.endpoint = yasgui.endpoint;
      Yasgui.defaults.requestConfig.method =
        yasgui.method == 'GET' ? 'GET' : 'POST';

    }
  }


  // When Yasgui gets the results
  onQueryResponse(data: any) {
    if (data.hasOwnProperty('text')) {
      this.errorMessage = null;
      this.jsonData = JSON.parse((data as any).text);
    } else if (data.hasOwnProperty('response')) {
      if (data.response.status == 400) {
        this.errorMessage = (data as any).response.text;
        this.jsonData = null;
      }
    }
  }

}
