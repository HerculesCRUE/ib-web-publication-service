import { Component, OnInit } from '@angular/core';
import { DataImporter } from 'src/app/_models/dataImporter';
import { DataImporterService } from 'src/app/_services/data-importer.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

/**
 * Componente para mostrar el detalle y alta de usuarios.
 */
@Component({
  selector: 'app-new-data-importer',
  templateUrl: './new-data-importer.component.html',
  styleUrls: ['./new-data-importer.component.css']
})
export class NewDataImporterComponent implements OnInit {
  // vbles
  importation: DataImporter;
  createMode: boolean;

  constructor(private router: Router,
    private translate: TranslateService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private dataImporterService: DataImporterService) { }

  ngOnInit() {
    this.createMode = true;
    this.importation = new DataImporter();
  }

  /**
   * Launchs an import operation
   */
  import() {
    let observable: Observable<DataImporter>;

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
