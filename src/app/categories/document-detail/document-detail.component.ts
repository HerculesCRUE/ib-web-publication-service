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
  document: DocumentDetail = {
    title: 'Extracción semántica de información basada en evolución ontologica',
    type: 'Tesis de doctorado',
    author: 'Jesús García Diaz',
    publishedBy: 'Universidad de Murcia',
    publishDate: '09-01-2014',
    organization: 'Universidad de Murcia',
    keyword: 'Semántica',
    resume: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    otherAuthors: ['María Hernandes Reyes Mora', 'Jesualdo Tomás Fernandez Breis']
  };


  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documentService.getDocumentByIdAndType('', '').subscribe(data => {
      if (data) {
        this.document = data;
      }
    });
  }




}
