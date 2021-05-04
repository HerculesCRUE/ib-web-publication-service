import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Direction, FindRequest, Order, Page, PageRequest, PaginatedSearchComponent } from 'src/app/_helpers/search';
import { KnowledgeArea } from 'src/app/_models/KnowledgeArea';
import { AreasService } from 'src/app/_services/areas.service';

@Component({
  selector: 'app-areas-list',
  templateUrl: './areas-list.component.html'
})
export class AreasListComponent extends PaginatedSearchComponent<KnowledgeArea> {

  /**
   *
   *
   * @type {FindRequest}
   * @memberof AreasListComponent
   */
  findRequest: FindRequest = new FindRequest();
  /**
   *
   *
   * @memberof AreasListComponent
   */
  dateIni;
  /**
   *
   *
   * @memberof AreasListComponent
   */
  dateFin;
  /**
   *
   *
   * @type {boolean}
   * @memberof AreasListComponent
   */
  loaded: boolean;


  constructor(private areasService: AreasService,
    router: Router,
    translate: TranslateService,
    toastr: ToastrService
  ) {
    super(router, translate, toastr);
  }


  /**
   *
   *
   * @protected
   * @param {FindRequest} findRequest
   * @return {*}  {Observable<Page<KnowledgeArea>>}
   * @memberof AreasListComponent
   */
  protected findInternal(findRequest: FindRequest): Observable<Page<KnowledgeArea>> {

    const page: Page<KnowledgeArea> = new Page();
    return this.areasService.find(findRequest).pipe(
      map((x) => {
        this.loaded = true;
        return x;
      }),
      catchError((err) => {
        this.loaded = true;
        return of(page);
      }));
  }

  /**
   *
   *
   * @protected
   * @param {*} entity
   * @return {*}  {Observable<any>}
   * @memberof AreasListComponent
   */
  protected removeInternal(entity: any): Observable<any> {
    return of({});
  }

  /**
   *
   *
   * @protected
   * @return {*}  {Order}
   * @memberof AreasListComponent
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
   * @memberof AreasListComponent
   */
  filter(): void {
    this.findRequest.pageRequest.page = 0;
    this.areasService.find(this.findRequest).subscribe({
      next: (data) => {
        this.resultObject = data;
        this.loaded = true;
      },
      error: () => {
        this.loaded = true;
      }
    });
  }


  /**
   *
   *
   * @param {PageRequest} pageRequest
   * @memberof AreasListComponent
   */
  allAreasFilteredSortChanged(pageRequest: PageRequest): void {
    this.findRequest.pageRequest.property = pageRequest.property;
    this.findRequest.pageRequest.direction = pageRequest.direction;
    this.areasService.find(this.findRequest).subscribe({
      next: (data) => {
        this.resultObject = data;
        this.loaded = true;
      },
      error: () => {
        this.loaded = true;
      }
    });
  }

}
