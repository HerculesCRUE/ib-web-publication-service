import { Component, Input, OnInit } from '@angular/core';
import { Direction, FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';
import { AcademicPublication } from 'src/app/_models/academicPublication';
import { Document } from 'src/app/_models/document';
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
  @Input() selectDocumentType: Array<any> = [
    { name: 'book', value: 'Book' }, { name: 'articles', value: 'Article' }
  ];

  @Input() url = './';
  /**
   *
   *
   * @type {string}
   * @memberof DocumentsComponent
   */
  @Input() idPrefix: string;
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
  isNormalTree = true;
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
  allDocumentFiltered: Page<Document | AcademicPublication> = new Page();
  /**
   *
   *
   * @memberof DocumentsComponent
   */
  normalTree = true;


  /**
   * Creates an instance of DocumentsComponent.
   * @param {ProjectService} projectService
   * @memberof DocumentsComponent
   */
  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    if (this.idPrefix === 'prodScientist') {
      this.url = '../../../document/';
    }
    this.findRequest.pageRequest.page = 1;
    this.findRequest.pageRequest.size = 10;
    this.findRequest.pageRequest.direction = Direction.ASC;
    this.findRequest.filter.types = this.filterDocumentType;
    if (this.idPrefix === 'academic') {
      this.documentService.findAcademicPublication(this.findRequest).subscribe((data) => {
        this.allDocumentFiltered = data;
        this.loaded = true;
      });
    } else {
      this.documentService.find(this.findRequest).subscribe((data) => {
        this.allDocumentFiltered = data;
        this.loaded = true;
      });
    }

  }


  /**
   *
   *
   * @param {*} event
   * @param {string} filterName
   * @memberof ScientificProductionComponent
   */
  filterProjects() {
    this.loaded = false;
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

      if (this.idPrefix === 'academic') {
        this.documentService.findAcademicPublication(this.findRequest).subscribe((data) => {
          this.allDocumentFiltered = data;
          this.loaded = true;
        });
      } else {
        this.documentService.find(this.findRequest).subscribe((data) => {
          this.allDocumentFiltered = data;
          this.loaded = true;
        });
      }

    }, 0);
  }

  /**
   *
   *
   * @param {number} i
   * @memberof ScientificProductionComponent
   */
  allprojectsFilteredPageChanged(i: number): void {
    this.loaded = false;
    this.findRequest.pageRequest.page = i - 1;
    this.findRequest.pageRequest.size = this.allDocumentFiltered.size;
    if (this.idPrefix === 'academic') {
      this.documentService.findAcademicPublication(this.findRequest).subscribe((data) => {
        this.allDocumentFiltered = data;
        this.loaded = true;
      });
    } else {
      this.documentService.find(this.findRequest).subscribe((data) => {
        this.allDocumentFiltered = data;
        this.loaded = true;
      });
    }

  }

  /**
   *
   *
   * @memberof DocumentsComponent
   */
  filterDocuments() {
    this.loaded = false;
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 0;
    pageRequest.size = this.allDocumentFiltered.size;
    this.findRequest.pageRequest = pageRequest;
    if (this.idPrefix === 'academic') {
      this.documentService.findAcademicPublication(this.findRequest).subscribe((data) => {
        this.allDocumentFiltered = data;
        this.loaded = true;
      });
    } else {
      this.documentService.find(this.findRequest).subscribe((data) => {
        this.allDocumentFiltered = data;
        this.loaded = true;
      });
    }


  }

  /**
   *
   *
   * @param {number} i
   * @memberof PatentsComponent
   */
  allprojectsFilteredSizeChanged(i: number): void {
    this.loaded = false;
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = this.allDocumentFiltered.number;
    pageRequest.size = i;
    this.findRequest.pageRequest = pageRequest;
    if (this.idPrefix === 'academic') {
      this.documentService.findAcademicPublication(this.findRequest).subscribe((data) => {
        this.allDocumentFiltered = data;
        this.loaded = true;
      });
    } else {
      this.documentService.find(this.findRequest).subscribe((data) => {
        this.allDocumentFiltered = data;
        this.loaded = true;
      });
    }

  }

  /**
   *
   *
   * @param {PageRequest} pageRequest
   * @memberof PatentsComponent
   */
  allprojectsFilteredSortChanged(pageRequest: PageRequest) {
    console.log(pageRequest);
    this.loaded = false;
    const newPageRequest: PageRequest = new PageRequest();
    newPageRequest.page = this.allDocumentFiltered.number;
    newPageRequest.size = this.allDocumentFiltered.size;
    newPageRequest.property = pageRequest.property;
    newPageRequest.direction = pageRequest.direction === Direction.ASC ? Direction.DESC : Direction.ASC;
    this.findRequest.pageRequest = pageRequest;

    if (this.idPrefix === 'academic') {
      this.documentService.findAcademicPublication(this.findRequest).subscribe((data) => {
        this.allDocumentFiltered = data;
        this.loaded = true;
      });
    } else {
      this.documentService.find(this.findRequest).subscribe((data) => {
        this.allDocumentFiltered = data;
        this.loaded = true;
      });
    }

  }

}
