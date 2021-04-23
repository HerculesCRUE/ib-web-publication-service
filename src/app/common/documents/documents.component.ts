import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { CustomDateAdapter, CustomDateParserFormatter, MaskController } from 'src/app/_helpers/datepicker-auxiliar';
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
  templateUrl: './documents.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: CustomDateAdapter },
  { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }]
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


  /**
   *
   *  if only display year on datepicker 
   * @type {boolean}
   * @memberof DocumentsComponent
   */
  @Input() showOnlyYEar: boolean;

  /**
   *
   *  the seond parameters if needed for the router
   * @memberof DocumentsComponent
   */
  @Input() routerFieldSecondary;

  /**
   *
   *  url link for detail
   * @memberof DocumentsComponent
   */
  @Input() url = './';
  /**
   *
   *  id prefix to avoid duplicated
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
   *  if tree is visible
   * @type {Boolean}
   * @memberof DocumentsComponent
   */
  @Input() isTreeVisible = true;
  /**
   *
   *  if needed de id for the organization to be filtered
   * @type {string}
   * @memberof DocumentsComponent
   */
  @Input() organizationId: string;
  /**
   *
   * if needed de id for the author/ person to be filtered
   * @type {string}
   * @memberof DocumentsComponent
   */
  @Input() authorId: string;
  /**
   *
   *  if types on select are hidden
   * @type {boolean}
   * @memberof DocumentsComponent
   */
  @Input() hideTypes: boolean;
  /**
   *
   * if tree starts with normal one or the graphic one
   * @memberof DocumentsComponent
   */
  isNormalTree = true;
  /**
   *
   *  if datepicker returns full date
   * @memberof DocumentsComponent
   */
  returnFullDate = true;
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


  constructor(private documentService: DocumentService,
    private maskController: MaskController,
    router: Router,
    translate: TranslateService,
    toastr: ToastrService,
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
  }

  /**
   *
   *
   * @protected
   * @param {FindRequest} findRequest
   * @return {*}  {(Observable<Page<Document | AcademicPublication>>)}
   * @memberof DocumentsComponent
   */
  protected findInternal(findRequest: FindRequest): Observable<Page<Document | AcademicPublication>> {
    this.findRequest.filter.types = this.filterDocumentType;
    let result;
    if (this.authorId) {
      this.findRequest.filter.authorId = this.authorId;
    }

    if (this.organizationId) {
      this.findRequest.filter.organizationId = this.organizationId;
    }

    switch (this.idPrefix) {
      case 'document':
        result = this.documentService.find(this.findRequest);
        break;
      case 'academic':
        result = this.documentService.findAcademicPublication(this.findRequest);
        break;
      case 'other':
        result = this.documentService.findOtherPublications(this.findRequest);
        break;
      default:
        result = this.documentService.findscientificpublication(this.findRequest);
        break;
    }

    this.loaded = true;
    return result;

  }

  /**
   *
   *
   * @protected
   * @param {*} entity
   * @return {*}  {Observable<any>}
   * @memberof DocumentsComponent
   */
  protected removeInternal(entity: any): Observable<any> {
    return of({});
  }

  /**
   *
   *
   * @protected
   * @return {*}  {Order}
   * @memberof DocumentsComponent
   */
  protected getDefaultOrder(): Order {
    return {
      property: 'id',
      direction: Direction.ASC
    };
  }



  /**
   *
   *
   * @memberof DocumentsComponent
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

      switch (this.idPrefix) {
        case 'document':
          this.documentService.find(this.findRequest).subscribe((data) => {
            this.resultObject = data;
            this.loaded = true;
          }, () => {
            this.loaded = true;
          });
          break;
        case 'academic':
          this.documentService.findAcademicPublication(this.findRequest).subscribe((data) => {
            this.resultObject = data;
            this.loaded = true;
          }, () => {
            this.loaded = true;
          });
          break;
        case 'other':
          this.documentService.findOtherPublications(this.findRequest).subscribe((data) => {
            this.resultObject = data;
            this.loaded = true;
          }, () => {
            this.loaded = true;
          });
          break;
        default:
          this.documentService.findscientificpublication(this.findRequest).subscribe((data) => {
            this.resultObject = data;
            this.loaded = true;
          }, () => {
            this.loaded = true;
          });
          break;
      }

    }, 0);
  }

  /**
   *
   *
   * @param {*} $event
   * @memberof DocumentsComponent
   */
  onDateSelect($event) {
    if (this.showOnlyYEar) {
      this.maskController.setMask('YYYY');
    } else {
      this.maskController.setMask('DD/MM/YYYY');
    }
  }

  /**
   *
   *
   * @memberof DocumentsComponent
   */
  filterDocuments() {
    this.findRequest.pageRequest.page = 0;

    switch (this.idPrefix) {
      case 'document':
        this.documentService.find(this.findRequest).subscribe((data) => {
          this.resultObject = data;
          this.loaded = true;
        }, () => {
          this.loaded = true;
        });
        break;
      case 'academic':
        this.documentService.findAcademicPublication(this.findRequest).subscribe((data) => {
          this.resultObject = data;
          this.loaded = true;
        }, () => {
          this.loaded = true;
        });
        break;
      case 'other':
        this.documentService.findOtherPublications(this.findRequest).subscribe((data) => {
          this.resultObject = data;
          this.loaded = true;
        }, () => {
          this.loaded = true;
        });
        break;
      default:
        this.documentService.findscientificpublication(this.findRequest).subscribe((data) => {
          this.resultObject = data;
          this.loaded = true;
        }, () => {
          this.loaded = true;
        });
        break;
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

    switch (this.idPrefix) {
      case 'document':
        this.documentService.find(this.findRequest).subscribe((data) => {
          this.resultObject = data;
          this.loaded = true;
        }, () => {
          this.loaded = true;
        });
        break;
      case 'academic':
        this.documentService.findAcademicPublication(this.findRequest).subscribe((data) => {
          this.resultObject = data;
          this.loaded = true;
        }, () => {
          this.loaded = true;
        });
        break;
      case 'other':
        this.documentService.findOtherPublications(this.findRequest).subscribe((data) => {
          this.resultObject = data;
          this.loaded = true;
        }, () => {
          this.loaded = true;
        });
        break;
      default:
        this.documentService.findscientificpublication(this.findRequest).subscribe((data) => {
          this.resultObject = data;
          this.loaded = true;
        }, () => {
          this.loaded = true;
        });
        break;
    }

  }



}
