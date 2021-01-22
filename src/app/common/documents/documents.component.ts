import { Component, Input, OnInit } from '@angular/core';
import { Direction, FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';
import { SparqlResults } from 'src/app/_models/sparql';
import { TableResultsHeaderItem } from 'src/app/_models/table-results';
import { DocumentService } from 'src/app/_services/document.service';

/**
 *
 *
 * @export
 * @class DocumentsComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html'
})
export class DocumentsComponent implements OnInit {
  /**
   * Data to show on select type
   *
   * @type {Array<string>}
   * @memberof DocumentsComponent
   */
  @Input() selectDocumentType: Array<string> = ['Audio', 'Publicación editada', 'Coleccionable', 'Libro', 'Caso de estudio',
    'Manual', 'Tesis'];
  /**
   *
   *
   * @type {Array<string>}
   * @memberof DocumentsComponent
   */
  @Input() filterDocumentType: Array<string> = [];
  /**
   *
   *
   * @type {Boolean}
   * @memberof DocumentsComponent
   */
  @Input() isTreeVisible = true;
  /**
   *
   *
   * @type {number}
   * @memberof DocumentsComponent
   */
  dateIni: number;
  /**
   *
   *
   * @type {number}
   * @memberof DocumentsComponent
   */
  dateFin: number;
  /**
   *
   *
   * @type {FindRequest}
   * @memberof DocumentsComponent
   */
  findRequest: FindRequest = new FindRequest();
  /**
   *
   *
   * @memberof DocumentsComponent
   */
  loaded = false;
  /**
   *
   *
   * @type {Page<SparqlResults>}
   * @memberof DocumentsComponent
   */
  allDocumentFiltered: Page<SparqlResults> = new Page();
  /**
   *
   *
   * @memberof DocumentsComponent
   */
  normalTree = true;

  /**
   *
   *
   * @type {TableResultsHeaderItem[]}
   * @memberof DocumentsComponent
   */
  headerData: TableResultsHeaderItem[] = [
    {
      textToTranslate: 'investigation-actions.documents-table.id',
      columnName: 'id'
    },
    {
      textToTranslate: 'investigation-actions.documents-table.name',
      columnName: 'name'
    },
    {
      textToTranslate: 'investigation-actions.documents-table.anyo',
      columnName: 'anyo'
    },
    {
      textToTranslate: 'investigation-actions.documents-table.type',
      columnName: 'type'
    }
  ];
  /**
   * Creates an instance of DocumentsComponent.
   * @param {ProjectService} projectService
   * @memberof DocumentsComponent
   */
  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 0;
    pageRequest.size = 10;
    this.findRequest.pageRequest = pageRequest;
    this.findRequest.filter.types = this.filterDocumentType;
    this.documentService.find(this.findRequest).subscribe((data) => {
      this.allDocumentFiltered = data;
      this.loaded = true;
    });
  }


  /**
   *
   *
   * @param {*} event
   * @param {string} filterName
   * @memberof ScientificProductionComponent
   */
  filterProjects() {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 0;
    pageRequest.size = this.allDocumentFiltered.size;
    pageRequest.direction = Direction.ASC;
    this.findRequest.pageRequest = pageRequest;


    setTimeout(() => {
      if (this.dateIni) {
        const currentDate = Helper.parseYear(this.dateIni);
        if (currentDate) {
          this.findRequest.filter.yearFrom = currentDate;
        }
      } else {
        this.findRequest.filter.yearFrom = null;
      }

      if (this.dateFin) {
        const currentDate = Helper.parseYear(this.dateFin);
        if (currentDate) {
          this.findRequest.filter.yearTo = currentDate;
        }
      } else {
        this.findRequest.filter.yearTo = null;
      }
      this.documentService.find(this.findRequest).subscribe((data) => {
        this.allDocumentFiltered = data;
        this.loaded = true;
      });
    }, 0);
  }

  /**
   *
   *
   * @param {number} i
   * @memberof ScientificProductionComponent
   */
  allprojectsFilteredPageChanged(i: number): void {
    this.findRequest.pageRequest.page = i - 1;
    this.findRequest.pageRequest.size = this.allDocumentFiltered.size;
    this.documentService.find(this.findRequest).subscribe((data) => {
      this.allDocumentFiltered = data;
      this.loaded = true;
    });
  }

  /**
   *
   *
   * @memberof DocumentsComponent
   */
  filterDocuments() {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 0;
    pageRequest.size = this.allDocumentFiltered.size;
    this.findRequest.pageRequest = pageRequest;
    this.documentService.find(this.findRequest).subscribe((data) => {
      this.allDocumentFiltered = data;
      this.loaded = true;
    });

  }

  /**
   *
   *
   * @param {number} i
   * @memberof PatentsComponent
   */
  allprojectsFilteredSizeChanged(i: number): void {

    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = this.allDocumentFiltered.number;
    pageRequest.size = i;
    pageRequest.direction = this.allDocumentFiltered.direction;
    this.findRequest.pageRequest = pageRequest;
    this.documentService.find(this.findRequest).subscribe((data) => {
      this.allDocumentFiltered = data;
      this.loaded = true;
    });
  }

  /**
   *
   *
   * @param {PageRequest} pageRequest
   * @memberof PatentsComponent
   */
  allprojectsFilteredSortChanged(pageRequest: PageRequest) {
    const newPageRequest: PageRequest = new PageRequest();
    newPageRequest.page = this.allDocumentFiltered.number;
    newPageRequest.size = this.allDocumentFiltered.size;
    newPageRequest.property = pageRequest.property;
    newPageRequest.direction = pageRequest.direction;
    this.findRequest.pageRequest = pageRequest;
    this.documentService.find(this.findRequest).subscribe((data) => {
      this.allDocumentFiltered = data;
      this.loaded = true;
    });
  }

}
