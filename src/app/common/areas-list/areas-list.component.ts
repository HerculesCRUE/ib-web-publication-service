import { Component, OnInit } from '@angular/core';
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
  templateUrl: './areas-list.component.html',
  styleUrls: ['./areas-list.component.css']
})
export class AreasListComponent extends PaginatedSearchComponent<KnowledgeArea> implements OnInit {

  findRequest: FindRequest = new FindRequest();
  dateIni;
  dateFin;
  loaded: boolean;


  constructor(private areasService: AreasService,
    router: Router,
    translate: TranslateService,
    toastr: ToastrService
  ) {
    super(router, translate, toastr);
  }

  ngOnInit(): void {

  }

  protected findInternal(findRequest: FindRequest): Observable<Page<KnowledgeArea>> {

    const page: Page<KnowledgeArea> = new Page();
    const result = this.areasService.find(findRequest).pipe(
      map((x) => {
        this.loaded = true;
        return x;
      }), // return the received value true/false
      catchError((err) => {
        this.loaded = true;
        return of(page);
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

  filter() {
    this.findRequest.pageRequest.page = 0;

    this.areasService.find(this.findRequest).subscribe((data) => {
      this.resultObject = data;
      this.loaded = true;
    }, () => {
      this.loaded = true;
    });

  }




  /**
   *
   *
   * @param {PageRequest} pageRequest
   * @memberof EventsComponent
   */
  allEventsFilteredSortChanged(pageRequest: PageRequest) {
    this.findRequest.pageRequest.property = pageRequest.property;
    this.findRequest.pageRequest.direction = pageRequest.direction;
    this.areasService.find(this.findRequest).subscribe((data) => {
      this.resultObject = data;
      this.loaded = true;
    }, () => {
      this.loaded = true;
    });
  }

}
