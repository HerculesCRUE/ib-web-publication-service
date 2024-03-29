import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { OrganizationDetail } from 'src/app/_models/organizationDetail';
import { ResearchmentStructuresService } from 'src/app/_services/researchment.structures.service';
/**
 *
 *
 * @export
 * @class ResearchmentStructuresDetailComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-researchment-structures-detail',
  templateUrl: './researchment-structures-detail.component.html'
})
export class ResearchmentStructuresDetailComponent implements OnInit {
  @ViewChild('resultsTab', { static: false })
  resultsTab: TabsetComponent;
  /**
   * researchment structure Id
   */
  id: string;
  /** 
   * researchment
   */
  researchment: OrganizationDetail = new OrganizationDetail();
  activeTab: string;
  lastItem: string;
  /**
   * Creates an instance of ResearchmentStructuresDetailComponent.
   * @param {ActivatedRoute} route
   * @param {ResearchmentStructuresService} researchmentStructureService
   * @memberof ResearchmentStructuresDetailComponent
   */
  constructor(
    private route: ActivatedRoute, private researchmentStructureService: ResearchmentStructuresService) { }

  /**
   *
   *
   * @memberof ResearchmentStructuresDetailComponent
   */
  ngOnInit(): void {


    this.route.params.subscribe((params: Params) => {
      this.id = params.id; // (+) converts string 'id' to a number
      this.activeTab = 'scientist';
      const type = params.type;
      if (type) {
        const typeFromURL = type.split('/');
        this.lastItem = typeFromURL.pop();
      }
      this.researchmentStructureService.getById(this.id, btoa(this.lastItem)).subscribe(data => {
        this.researchment = data;
      });
    });
  }


  /**
   *
   *
   * @param {string} tabName
   * @memberof ResearchmentStructuresDetailComponent
   */
  changeTab(tabName: string) {
    this.activeTab = tabName;
  }

}
