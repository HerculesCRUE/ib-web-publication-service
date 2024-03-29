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
import { LdpEntityCounter } from 'src/app/_models/ldpEntity';
import { Helper } from 'src/app/_helpers/utils';

/**
 * Class that draw a table
 *
 * @export
 * @class TableResultsLdpCountComponent
 * @extends {PaginatedSearchComponent<any>}
 * @implements {OnChanges}
 * 
 * 
 * 
 *
 */
@Component({
  selector: 'app-table-results-ldp-count',
  templateUrl: './table-results-ldp-count.component.html',
  styleUrls: ['./table-results-ldp-count.component.css'],
})
export class TableResultsLdpCountComponent
  extends PaginatedSearchComponent<any>
  implements OnChanges {

  selectedItem: LdpEntityCounter;

  /**
   * Mandatory to show the data in the table
   *
   * @memberof TableResultsValidatorComponent
   */
  @Input()
  set data(val: any) {
    if (val) {
      const data: Array<{ entity: string, count: number, entityName: string }> = JSON.parse(JSON.stringify(val));

      this.translateService.get('ldp.category.values').subscribe((translations: any) => {
        data.forEach(d => {
          let name = Helper.getLdpEntityName(d.entity);
          if (translations && translations[name]) {
            name = translations[name].s;
          }
          d.entityName = name;
        });
        this.dataComplete = data;
      });

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
   * @memberof TableResultsValidatorComponent
   */
  @Input()
  pageInfo: Page<any>;

  /**
   * reouterField sets a link on the row
   *
   * @type {string}
   * @memberof TableResultsValidatorComponent
   */
  @Input()
  routerField: string;
  /**
   *
   *
   * @type {string}
   * @memberof TableResultsValidatorComponent
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
   * @memberof TableResultsDtoComponent
   */
  @Output()
  pageChanged: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Send the event when page is changed
   *
   * @type {EventEmitter<number>}
   * @memberof TableResultsDtoComponent
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
   * @memberof TableResultsValidatorComponent
   */
  hedearDTO: Array<string> = [];


  routerChild: Router;

  /**
   *
   *
   * @type {Array<string>}
   * @memberof TableResultsValidatorComponent
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
      this.hedearDTO = Object.keys(this.data[0]).filter(k => k !== 'entityName');
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
    const order = new Order();
    order.property = 'count';
    order.direction = Direction.DESC;
    return order;
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
}
