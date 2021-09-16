import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Direction, FindRequest, Order, Page, PaginatedSearchComponent } from 'src/app/_helpers/search';
import { LdpRelatedSearchResult } from 'src/app/_models/LdpRelatedSearchResult';

/**
 * Class that draw a table
 *
 * @export
 * @class TableResultsLdpRelatedSearchComponent
 * @extends {PaginatedSearchComponent<any>}
 * @implements {OnChanges}
 * 
 * 
 * 
 *
 */
@Component({
  selector: 'app-table-results-ldp-related-search',
  templateUrl: './table-results-ldp-related-search.component.html',
  styleUrls: ['./table-results-ldp-related-search.component.css'],
})
export class TableResultsLdpRelatedSearchComponent
  extends PaginatedSearchComponent<any>
  implements OnChanges {

  selectedItem: LdpRelatedSearchResult;

  /**
 * Mandatory to show the data in the table
 *
 * @memberof TableResultsLdpRelatedSearchComponent
 */
  @Input()
  set data(val: any) {
    if (val) {
      this.dataComplete = JSON.parse(JSON.stringify(val));
    }

  }

  get data(): any {
    return this.dataComplete;
  }
  @Input() displayPagination = true;

  /**
   * Data needed to set pagination if we have server pagination
   * Data used of Page (mandatory) in this case:
   * 
   *
   * @type {Page<any>}
   * @memberof TableResultsLdpRelatedSearchComponent
   */
  @Input()
  pageInfo: Page<any>;

  /**
   * reouterField sets a link on the row
   *
   * @type {string}
   * @memberof TableResultsLdpRelatedSearchComponent
   */
  @Input()
  routerField: string;
  /**
   *
   *
   * @type {string}
   * @memberof TableResultsLdpRelatedSearchComponent
   */
  @Input()
  routerNameLink = './';

  @Input()
  routerFieldSecondary = '';

  @Input() findRequest: FindRequest = new FindRequest();


  /**
   * Send the event when page is changed
   *
   * @type {EventEmitter<number>}
   * @memberof TableResultsLdpRelatedSearchComponent
   */
  @Output()
  pageChanged: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Send the event when page is changed
   *
   * @type {EventEmitter<number>}
   * @memberof TableResultsLdpRelatedSearchComponent
   */
  @Output()
  sizeChanged: EventEmitter<number> = new EventEmitter<number>();

  /*
   * Initial data
   */
  dataComplete: any; // private property dataComplete
  /*
   * Data that is shown in the actual page
   */
  dataCompleteToShow;

  numPages = 1;
  /**
   *
   *
   * @type {Array<string>}
   * @memberof TableResultsLdpRelatedSearchComponent
   */
  hedearDTO: Array<string> = [];


  routerChild: Router;

  /**
   *
   *
   * @type {Array<string>}
   * @memberof TableResultsLdpRelatedSearchComponent
   */
  @Input() dtoTypeTranslate = '';
  @Input() extra = '';
  constructor(
    private translateService: TranslateService,
    router: Router,
    translate: TranslateService,
    toastr: ToastrService
  ) {
    super(router, translate, toastr);
    this.routerChild = router;
  }


  ngOnChanges(changes: SimpleChanges): void {
    // obtengo los headers
    if (this.data?.length > 0) {
      this.hedearDTO = ['relatedDescription', 'relatedType'];
    }
    if (!!this.pageInfo) {
      this.dataCompleteToShow = this.dataComplete;
    }
    this.find();
  }

  protected findInternal(findRequest: FindRequest): Observable<Page<any>> {
    const page: Page<any> = new Page<any>();
    if (!!this.pageInfo) {

      page.content = this.dataCompleteToShow;
      page.number = this.pageInfo.number - 1;
      if (this.pageInfo.number === 1) {
        page.first = true;
      }
      if (this.pageInfo.number === this.numPages) {
        page.last = true;
      }


      page.numberOfElements = Math.min(page.content?.length, this.pageInfo?.size);
      page.size = this.pageInfo.size;
      page.totalElements = this.pageInfo.totalElements;


    } else {
      if (findRequest.pageRequest.page === 0) {
        this.showPage(1);

        page.first = true;
        page.last = false;

        page.number = 0;

      } else {
        if (findRequest.pageRequest.page === 1) {
          page.first = true;
        }
        if (findRequest.pageRequest.page === this.numPages) {
          page.last = true;
        }

        this.showPage(findRequest.pageRequest.page);

        page.number = findRequest.pageRequest.page - 1;

      }



      page.content = this.dataCompleteToShow;
      page.numberOfElements = Math.min(page.content.length, this.findRequest.pageRequest.size);
      page.size = this.findRequest.pageRequest.size;
      page.totalElements = this.dataComplete.results.bindings.length;
    }

    return of(page);
  }
  protected removeInternal(entity: any): Observable<{} | Response> {
    return;
  }

  protected getDefaultOrder(): Order {
    return new Order();
  }

  showPage(i: number): void {
    if (!!this.findRequest.pageRequest.property && this.dataComplete.head.vars.indexOf(this.findRequest.pageRequest.property) > 0) {
      this.dataComplete.results.bindings = this.dataComplete.results.bindings.sort((a, b) => {
        if (this.findRequest.pageRequest.direction === Direction.ASC) {
          return (a[this.findRequest.pageRequest.property].value > b[this.findRequest.pageRequest.property].value) ? 1 : -1;
        }
        return (a[this.findRequest.pageRequest.property].value <= b[this.findRequest.pageRequest.property].value) ? 1 : -1;
      });
    }
    const init = (i - 1) * this.findRequest.pageRequest.size;
    const end = i * this.findRequest.pageRequest.size;
    this.dataCompleteToShow = this.dataComplete.results.bindings.slice(init, end);
  }

  callShowPageWhenPageChanges(i: number): void {
    this.findRequest.pageRequest.page = i;
    if (!this.pageInfo) {
      this.find();
    } else {
      this.pageChanged.emit(i);
    }
  }

  callShowPageWhenSizeChanges(i: number): void {
    this.findRequest.pageRequest.size = i;
    if (!this.pageInfo) {
      this.find();
    } else {
      this.sizeChanged.emit(i);
    }
  }

  /**
   *
   *
   * @param {string} headerName
   * @return {*} 
   * @memberof TableResultsValidatorComponent
   */
  needTooltip(headerName: string) {
    const needTooltip = { required: false, textValue: '' };
    if (headerName === 'hIndex') {
      needTooltip.textValue = this.translateService.instant('tooltip.hIndex');
      needTooltip.required = true;
    }
    return needTooltip;
  }

  validURL(str: string) {
    var urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

    let isUrl = !!urlPattern.test(str);

    var uuidPattern = new RegExp('^.*[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$', 'i'); // fragment locator

    let isUUID = !!uuidPattern.test(str);

    return isUrl && isUUID;
  }
}
