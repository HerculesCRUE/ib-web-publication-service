import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Direction, FindRequest, Order, Page, PageRequest, PaginatedSearchComponent } from 'src/app/_helpers/search';
import { BookSection } from 'src/app/_models/bookSection';
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
export class DocumentDetailComponent extends PaginatedSearchComponent<BookSection> implements OnInit {


  /**
   *
   *
   * @type {*}
   * @memberof DocumentDetailComponent
   */
  document: any;
  loaded: boolean;
  lastItem = '';
  findRequest: FindRequest = new FindRequest();
  isBook: boolean;
  constructor(private documentService: DocumentService, private rutaActiva: ActivatedRoute,
    private _location: Location,
    router: Router,
    translate: TranslateService,
    toastr: ToastrService
  ) {
    super(router, translate, toastr);
  }

  ngOnInit(): void {
    const id = this.rutaActiva.snapshot.params.id;
    const type = this.rutaActiva.snapshot.params.type;

    if (type) {
      const typeFromURL = type.split('/');
      this.lastItem = typeFromURL.pop();
    }

    if (this.lastItem === 'Book') {
      this.isBook = true;
      this.findRequest.filter.id = id;
      this.documentService.getBookSection(this.findRequest).subscribe(data => {
        console.log(data);
      });
    }


    if (this.lastItem === 'Dossier') {
      this.documentService.getotherByIdAndType(id, btoa(this.lastItem)).subscribe(data => {
        if (data) {
          this.document = data;
          this.loaded = true;
        }
      });
    } else if (this.lastItem === 'Book' || this.lastItem === 'Article') {
      this.documentService.getDocumentByIdAndType(id, btoa(this.lastItem)).subscribe(data => {
        if (data) {
          this.document = data;
          this.loaded = true;
        }
      });
    } else {
      this.documentService.getacademicByIdAndType(id, btoa(this.lastItem)).subscribe(data => {
        if (data) {
          this.document = data;
          this.loaded = true;
        }
      });
    }

  }

  backClicked() {
    this._location.back();
  }


  protected findInternal(findRequest: FindRequest): Observable<Page<BookSection>> {
    const page: Page<BookSection> = new Page();
    const result = this.documentService.getBookSection(findRequest).pipe(
      map((x) => {
        this.loaded = true;
        return x;
      }), // return the received value true/false
      catchError((err) => {
        this.loaded = true;
        return of(page)
      }));
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


  allDocumentSortChanged(pageRequest: PageRequest): void {
    this.findRequest.pageRequest.property = pageRequest.property;
    this.findRequest.pageRequest.direction = pageRequest.direction;
    this.documentService.getBookSection(this.findRequest).subscribe((data) => {
      this.resultObject = data;
      this.loaded = true;
    }, () => {
      this.loaded = true;
    });
  }


}
