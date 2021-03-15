import { Component, OnInit } from '@angular/core';
import { DocumentDetail } from 'src/app/_models/documentDetail';
import { DocumentService } from 'src/app/_services/document.service';

/**
 *
 *
 * @export
 * @class DocumentDetailComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html'
})
export class DocumentDetailComponent implements OnInit {


  /**
   *
   *
   * @type {*}
   * @memberof DocumentDetailComponent
   */
  document: any;
  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documentService.getDocumentByIdAndType('', '').subscribe(data => {
      if (data) {
        this.document = data;
      }
    });
  }




}
