import { Component, Input, OnInit } from '@angular/core';
import { Direction, FindRequest, Page, PageRequest } from 'src/app/_helpers/search';
import { Helper } from 'src/app/_helpers/utils';
import { AcademicPublication } from 'src/app/_models/academicPublication';
import { DocumentService } from 'src/app/_services/document.service';

/**
 *
 *
 * @export
 * @class DirectedJobsComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-directed-jobs',
  templateUrl: './directed-jobs.component.html'
})
export class DirectedJobsComponent implements OnInit {
  /**
   *
   *
   * @type {FindRequest}
   * @memberof DirectedJobsComponent
   */
  findRequest: FindRequest = new FindRequest();
  @Input() idPrefix: string;
  @Input() scientificId: string;
  /**
   *
   *
   * @memberof DirectedJobsComponent
   */
  loaded = false;
  dateIni;

  allDirectedJobs: Page<AcademicPublication> = new Page();

  /**
   *
   *
   * @memberof DirectedJobsComponent
   */
  yearsForSelect = Helper.getYears();
  filters: Map<string, string> = new Map();

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.findRequest.pageRequest.page = 1;
    this.findRequest.pageRequest.size = 10;
    this.findRequest.pageRequest.direction = Direction.ASC;
    this.findRequest.filter.directedBy = this.scientificId;
    this.documentService.findAcademicPublication(this.findRequest).subscribe(data => {
      this.allDirectedJobs = data;
      this.loaded = true;
    });

  }

  /**
   *
   *
   * @memberof DirectedJobsComponent
   */
  filteDirectedJobs() {
    setTimeout(() => {
      if (this.dateIni) {
        const currentDate = Helper.parse(this.dateIni);
        if (currentDate) {
          this.findRequest.filter.date = currentDate;
        }
      } else {
        this.findRequest.filter.date = null;
      }
      this.documentService.findAcademicPublication(this.findRequest).subscribe(data => {
        this.allDirectedJobs = data;
        this.loaded = true;
      });
    }, 0);
    this.loaded = true;
  }
  /**
   *
   *
   * @param {number} i
   * @memberof DirectedJobsComponent
   */
  allDirectedFilteredPageChanged(i: number) {
    this.loaded = false;
    this.findRequest.pageRequest.page = i - 1;
    this.findRequest.pageRequest.size = this.allDirectedJobs.size;
    this.documentService.findAcademicPublication(this.findRequest).subscribe(data => {
      this.allDirectedJobs = data;
      this.loaded = true;
    });
  }
  /**
   *
   *
   * @param {number} i
   * @memberof DirectedJobsComponent
   */
  allDirectedFilteredSizeChanged(i: number) {
    this.loaded = false;
    const pageRequest: PageRequest = new PageRequest();
    pageRequest.page = this.allDirectedJobs.number;
    pageRequest.size = i;
    this.findRequest.pageRequest = pageRequest;

    this.documentService.findAcademicPublication(this.findRequest).subscribe(data => {
      this.allDirectedJobs = data;
      this.loaded = true;
    });
  }
  /**
   *
   *
   * @param {PageRequest} pageRequest
   * @memberof DirectedJobsComponent
   */
  allDirectedFilteredSortChanged(pageRequest: PageRequest) {
    this.loaded = false;
    const newPageRequest: PageRequest = new PageRequest();
    newPageRequest.page = this.allDirectedJobs.number;
    newPageRequest.size = this.allDirectedJobs.size;
    newPageRequest.property = pageRequest.property;
    newPageRequest.direction = pageRequest.direction === Direction.ASC ? Direction.DESC : Direction.ASC;
    this.findRequest.pageRequest = pageRequest;

    this.documentService.findAcademicPublication(this.findRequest).subscribe(data => {
      this.allDirectedJobs = data;
      this.loaded = true;
    });
  }
}
