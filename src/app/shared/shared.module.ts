import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableResultsComponent } from '../common-display-data/table-results/table-results.component';
import { RouterModule } from '@angular/router';
import { PatentService } from '../_services/patent.service';
import { DocumentService } from '../_services/document.service';
import { TableResultsDtoComponent } from '../common-display-data/table-results-dto/table-results-dto.component';
import { TableResultsImporterComponent } from '../common-display-data/table-results-importer/table-results-importer.component';

@NgModule({
  declarations: [
    PaginationComponent,
    TableResultsComponent,
    TableResultsDtoComponent,
    TableResultsImporterComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild(),
    PaginationModule,
    FormsModule,
    NgbModule
  ],
  exports: [PaginationComponent,
    RouterModule,
    TranslateModule,
    CommonModule,
    NgbModule,
    TableResultsComponent,
    TableResultsDtoComponent,
    TableResultsImporterComponent],
  providers: [
    PatentService,
    DocumentService
  ]
})
export class SharedModule { }
