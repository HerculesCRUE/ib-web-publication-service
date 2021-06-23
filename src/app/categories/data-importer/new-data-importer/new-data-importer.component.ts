import { Component, OnInit } from '@angular/core';
import { DataImporter } from 'src/app/_models/dataImporter';
import { DataImporterService } from 'src/app/_services/data-importer.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { DataImporterConstants } from 'src/app/_models/dataImporterConstants';

/**
 * Component in order to launch a new importation
 */
@Component({
  selector: 'app-new-data-importer',
  templateUrl: './new-data-importer.component.html',
  styleUrls: ['./new-data-importer.component.css']
})
export class NewDataImporterComponent implements OnInit {
  // vbles
  importation: DataImporter;
  constants: DataImporterConstants;
  createMode: boolean;

  constructor(private router: Router,
    private translate: TranslateService,
    private toastr: ToastrService,
    private dataImporterService: DataImporterService) { }

  ngOnInit() {
    this.constants = new DataImporterConstants();
    this.init();

    this.createMode = true;
    this.importation = new DataImporter();

    // we set defaul values
    this.importation.type = this.constants.DATASET;
    this.importation.params = this.constants.DATASET_PARAM;
  }

  /**
   * Method to initialize the constants
   */
  init() {
    this.constants.DATASET = "dataset";
    this.constants.DATASET_PARAM = "/home/herculesizertis/resourcesFull/dataset";

    this.constants.CVN = "cvn";
    this.constants.CVN_PARAM = "http://curriculumpruebas.um.es/curriculum/rest/v1/auth";

    this.constants.SGI = "oaipmh";
    this.constants.SGI_PARAM = "http://herc-as-front-desa.atica.um.es/oai-pmh-xml/OAI_PMH";

    this.constants.CERIF = "cerif";
    this.constants.CERIF_PARAM = "http://herc-as-front-desa.atica.um.es/oai-pmh-xml/DAI_PMH";
  }

  /**
   * Method invoked when the user changes the importation type
   * @param param 
   */
  onTypeChange(param: string) {
    this.importation.params = param;
  }


  /**
   * Launchs an import operation
   */
  import() {
    let observable: Observable<DataImporter>;

    // we set the user_name
    const userName = localStorage.getItem('user_name');
    this.importation.user = userName;

    console.info(this.importation);
    if (this.createMode) {
      observable = this.dataImporterService.import(this.importation);

    }
    observable.subscribe(
      ((importation: DataImporter) => {
        if (this.createMode) {
          this.router.navigate(['/main/data-importer']);
        }
        console.info(importation);
        this.toastr.success(this.translate.instant('importation.succeeded-import', this.translate.instant('toast.success')));
      }), (error => {
        console.error(error);
        this.toastr.error(this.translate.instant('importation.failed-import', this.translate.instant('toast.error')));
      })
    );
  }
}
