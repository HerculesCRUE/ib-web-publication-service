import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Direction, FindRequest, Order, Page, PageRequest, PaginatedSearchComponent } from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';
import { Person } from 'src/app/_models/person';
import { SparqlResults } from 'src/app/_models/sparql';
import { TableResultsHeaderItem } from 'src/app/_models/table-results';
import { ParticipantService } from 'src/app/_services/participant.service';
import { ResearchStaffService } from 'src/app/_services/research-staff.service';

/**
 *
 *
 * @export
 * @class ParticipantsComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html'
})
export class ParticipantsComponent extends PaginatedSearchComponent<Person> implements OnInit {
  /**
   * university Id for search filter in case of necessary
   */
  @Input() universityId: string;
  /**
   *
   *
   * @type {Page<SparqlResults>}
   * @memberof ParticipantsComponent
   */
  allDataParticipants: Page<SparqlResults> = new Page();
  /**
   *
   *
   * @type {Page<SparqlResults>}
   * @memberof ParticipantsComponent
   */
  allDataParticipantsSecondTable: Page<SparqlResults> = new Page();

  /**
   *
   *
   * @type {Page<Person>}
   * @memberof ParticipantsComponent
   */
  allDataPerson: Page<Person> = new Page();
  /**
   *
   *
   * @type {FindRequest}
   * @memberof ParticipantsComponent
   */
  findRequest: FindRequest = new FindRequest();
  /**
   *
   *
   * @memberof ParticipantsComponent
   */
  loaded = false;
  /**
   *
   *
   * @type {TableResultsHeaderItem[]}
   * @memberof ParticipantsComponent
   */
  headerData: TableResultsHeaderItem[] = [
    {
      textToTranslate: 'participant.table-header.centro',
      columnName: 'Centro'
    },
    {
      textToTranslate: 'participant.table-header.dpto',
      columnName: 'Dpto'
    },
    {
      textToTranslate: 'participant.table-header.id',
      columnName: 'id'
    }
  ];
  /**
   *
   *
   * @type {TableResultsHeaderItem[]}
   * @memberof ParticipantsComponent
   */
  headerData2: TableResultsHeaderItem[] = [
    {
      textToTranslate: 'scientist.table-header.name',
      columnName: 'name'
    },
    {
      textToTranslate: 'scientist.table-header.area',
      columnName: 'area'
    },
    {
      textToTranslate: 'scientist.table-header.type',
      columnName: 'type'
    },
    {
      textToTranslate: 'scientist.table-header.appointments',
      columnName: 'appointments'
    },
    {
      textToTranslate: 'scientist.table-header.h-index',
      columnName: 'hIndex'
    },
    {
      textToTranslate: 'scientist.table-header.publications',
      columnName: 'publications'
    }
  ];
  /**
   *
   *
   * @memberof ParticipantsComponent
   */
  yearsForSelect = Helper.getYears();
  loaded2 = false;
  constructor(
    private participantService: ParticipantService,
    private researchStaff: ResearchStaffService,
    router: Router,
    translate: TranslateService,
    toastr: ToastrService
  ) {
    super(router, translate, toastr);
  }


  ngOnInit(): void {

    /* this.researchStaff.find(this.findRequest).subscribe(data => {
       this.allDataPerson = data;
       this.loaded2 = true;
     });
 
     const findRequest: FindRequest = new FindRequest();
     this.participantService.findPerson(findRequest).subscribe(data => {
       this.allDataParticipants = data;
       this.allDataParticipantsSecondTable = data;
       this.loaded = true;
     });*/

  }


  protected findInternal(findRequest: FindRequest): Observable<Page<Person>> {
    const result = this.participantService.findPerson(findRequest);
    this.loaded = true;
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

  allParticipantsFilteredSortChanged(pageRequest: PageRequest) {
    this.findRequest.pageRequest.property = pageRequest.property;
    this.findRequest.pageRequest.direction = pageRequest.direction;
    this.participantService.findPerson(this.findRequest).subscribe((data) => {
      this.resultObject = data;
      this.loaded = true;
    });
  }

  changePersonProyect() {
    this.participantService.findPerson(this.findRequest).subscribe((data) => {
      this.resultObject = data;
      this.loaded = true;
    });


  }


  /*
   
    allScientistsFilteredPageChanged(i: number): void {
      const pageRequest: PageRequest = new PageRequest();
      pageRequest.page = i;
      pageRequest.size = this.allDataParticipants.size;
      pageRequest.property = this.allDataParticipants.sort;
      pageRequest.direction = this.allDataParticipants.direction;
      this.loaded = true;
    }
  
  
    allParticipantsFilteredPageChanged(i: number): void {
      this.findRequest.pageRequest.page = i - 1;
      this.findRequest.pageRequest.size = this.allDataParticipants.size;
      this.participantService.findPerson(this.findRequest).subscribe((data) => {
        this.allDataParticipants = data;
        this.loaded = true;
      });
    }
  
  
    allParticipantsFilteredSizeChanged(i: number): void {
      const pageRequest: PageRequest = new PageRequest();
      pageRequest.page = this.allDataParticipants.number;
      pageRequest.size = i;
      pageRequest.direction = this.allDataParticipants.direction;
      this.findRequest.pageRequest = pageRequest;
      this.participantService.findPerson(this.findRequest).subscribe((data) => {
        this.allDataParticipants = data;
        this.loaded = true;
      });
    }
  
    allParticipantsFilteredSortChanged(pageRequest: PageRequest) {
      const newPageRequest: PageRequest = new PageRequest();
      newPageRequest.page = this.allDataParticipants.number;
      newPageRequest.size = this.allDataParticipants.size;
      newPageRequest.property = pageRequest.property;
      newPageRequest.direction = pageRequest.direction;
      this.findRequest.pageRequest = pageRequest;
      this.participantService.findPerson(this.findRequest).subscribe((data) => {
        this.allDataParticipants = data;
        this.loaded = true;
      });
    }
  
    
    allChanged(event) { }
  
   
    changePersonProyect() {
      this.participantService.findPerson(this.findRequest).subscribe((data) => {
        this.allDataParticipants = data;
        this.loaded = true;
      });
  
  
    }
   
    changePersonProyectSecond() {
      this.findRequest.filter.name = this.findRequest.filter.nameDos;
      this.participantService.findPerson(this.findRequest).subscribe((data) => {
        this.findRequest.filter.name = '';
        this.allDataParticipantsSecondTable = data;
        this.loaded = true;
      });
    }*/

}