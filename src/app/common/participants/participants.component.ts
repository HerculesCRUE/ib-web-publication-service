import { Component, Input, OnInit } from '@angular/core';
import { FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
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
export class ParticipantsComponent implements OnInit {
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
    private researchStaff: ResearchStaffService) {
  }


  ngOnInit(): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = 1;
    pageRequest.size = 10;
    this.researchStaff.find(this.findRequest).subscribe(data => {
      this.allDataPerson = data;
      this.loaded2 = true;
    });

    const findRequest: FindRequest = new FindRequest();
    this.participantService.findPerson(findRequest).subscribe(data => {
      this.allDataParticipants = data;
      this.allDataParticipantsSecondTable = data;
      this.loaded = true;
    });

  }


  /**
   *
   *
   * @param {number} i
   * @memberof ParticipantsComponent
   */
  allScientistsFilteredPageChanged(i: number): void {
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = i;
    pageRequest.size = this.allDataParticipants.size;
    pageRequest.property = this.allDataParticipants.sort;
    pageRequest.direction = this.allDataParticipants.direction;
    this.loaded = true;
  }

  /**
   *
   *
   * @param {number} i
   * @memberof ParticipantsComponent
   */
  allParticipantsFilteredPageChanged(i: number): void {
    this.findRequest.pageRequest.page = i - 1;
    this.findRequest.pageRequest.size = this.allDataParticipants.size;
    this.participantService.findPerson(this.findRequest).subscribe((data) => {
      this.allDataParticipants = data;
      this.loaded = true;
    });
  }

  /**
   *
   *
   * @param {number} i
   * @memberof ParticipantsComponent
   */
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

  /**
   *
   *
   * @param {PageRequest} pageRequest
   * @memberof ParticipantsComponent
   */
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

  /**
   *
   *
   * @param {*} event
   * @memberof ParticipantsComponent
   */
  allChanged(event) { }


}
