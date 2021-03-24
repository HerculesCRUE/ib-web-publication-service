import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  loaded: boolean;
  lastItem = '';
  constructor(private documentService: DocumentService, private rutaActiva: ActivatedRoute, private _location: Location) { }

  ngOnInit(): void {
    const id = this.rutaActiva.snapshot.params.id;
    const type = this.rutaActiva.snapshot.params.type;
    if (type) {
      const typeFromURL = type.split('/');
      this.lastItem = typeFromURL.pop();
    }

    this.documentService.getDocumentByIdAndType(id, btoa(this.lastItem)).subscribe(data => {
      if (data) {
        this.document = data;
        this.loaded = true;
      }
    });
  }

  backClicked() {
    this._location.back();
  }


}
