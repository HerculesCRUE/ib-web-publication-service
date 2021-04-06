import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Direction, FindRequest, Order, Page, PageRequest, PaginatedSearchComponent } from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';
import { AcademicPublication } from 'src/app/_models/academicPublication';
import { Document } from 'src/app/_models/document';
import { OtherPublication } from 'src/app/_models/otherPublication';
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
export class DocumentsComponent extends PaginatedSearchComponent<Document | AcademicPublication | OtherPublication> implements OnInit {
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
  @Input() organizationId: string;
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
   * @memberof DocumentsComponent
   */
  normalTree = true;
  @Input() authorId: string;


  /**
   * Creates an instance of DocumentsComponent.
   * @param {ProjectService} projectService
   * @memberof DocumentsComponent
   */
  constructor(private documentService: DocumentService,
    router: Router,
    translate: TranslateService,
    toastr: ToastrService
  ) {
    super(router, translate, toastr);
  }

  ngOnInit(): void {
    this.findRequest.filter.types = this.filterDocumentType;
    if (this.authorId) {
      this.findRequest.filter.authorId = this.authorId;
    }

    if (this.organizationId) {
      this.findRequest.filter.organizationId = this.organizationId;
    }


    if (this.idPrefix === 'prodScientist') {
      this.url = '../../../document/';
    }


  }

  protected findInternal(findRequest: FindRequest): Observable<Page<Document | AcademicPublication>> {
    this.findRequest.filter.types = this.filterDocumentType;
    let result;
    if (this.authorId) {
      this.findRequest.filter.authorId = this.authorId;
    }

    if (this.organizationId) {
      this.findRequest.filter.organizationId = this.organizationId;
    }
    if (this.idPrefix === 'academic') {
      result = this.documentService.findAcademicPublication(this.findRequest);
    }
    if (this.idPrefix === 'other') {
      result = this.documentService.findOtherPublications(this.findRequest);
    } else {
      result = this.documentService.find(this.findRequest);
    }
    result.subscribe(data => {
      this.loaded = true;
    });
    return result;

  }

  protected removeInternal(entity: any): Observable<any> {
    return of({});
  }

  protected getDefaultOrder(): Order {
    return {
      property: 'id',
      direction: Direction.ASC
    };
  }


  /**
   *
   *
   * @param {*} event
   * @param {string} filterName
   * @memberof ScientificProductionComponent
   */
  filterProjects() {
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

      if (this.findRequest.filter.type) {
        this.findRequest.filter.types = this.findRequest.filter.type;
      }

      if (this.idPrefix === 'academic') {
        this.documentService.findAcademicPublication(this.findRequest).subscribe((data) => {
          this.resultObject = data;
          this.loaded = true;
        });
      } if (this.idPrefix === 'other') {
        this.documentService.findOtherPublications(this.findRequest).subscribe((data) => {
          this.resultObject = data;
          this.loaded = true;
        });
      } else {
        this.documentService.find(this.findRequest).subscribe((data) => {
          this.resultObject = data;
          this.loaded = true;
        });
      }

    }, 0);
  }



  /**
   *
   *
   * @memberof DocumentsComponent
   */
  filterDocuments() {

    if (this.idPrefix === 'academic') {
      this.documentService.findAcademicPublication(this.findRequest).subscribe((data) => {
        this.resultObject = data;
        this.loaded = true;
      });
    } if (this.idPrefix === 'other') {
      this.documentService.findOtherPublications(this.findRequest).subscribe((data) => {
        this.resultObject = data;
        this.loaded = true;
      });
    } else {
      this.documentService.find(this.findRequest).subscribe((data) => {
        this.resultObject = data;
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
    this.findRequest.pageRequest.property = pageRequest.property;
    this.findRequest.pageRequest.direction = pageRequest.direction;

    if (this.idPrefix === 'academic') {
      this.documentService.findAcademicPublication(this.findRequest).subscribe((data) => {
        this.resultObject = data;
        this.loaded = true;
      });
    } if (this.idPrefix === 'other') {
      this.documentService.findOtherPublications(this.findRequest).subscribe((data) => {
        this.resultObject = data;
        this.loaded = true;
      });
    } else {
      this.documentService.find(this.findRequest).subscribe((data) => {
        this.resultObject = data;
        this.loaded = true;
      });
    }

  }

}
