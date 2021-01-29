import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FindRequest } from 'src/app/_helpers/search';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-projects-detail',
  templateUrl: './projects-detail.component.html'
})
export class ProjectsDetailComponent implements OnInit {
  /**
   *
   *
   * @type {string}
   * @memberof ProjectsDetailComponent
   */
  id: string;
  /**
   *
   *
   * @type {FindRequest}
   * @memberof ProjectsDetailComponent
   */
  findRequest: FindRequest = new FindRequest();
  /**
   *
   *
   * @type {*}
   * @memberof ProjectsDetailComponent
   */
  proyect: any;
  /**
   *
   *
   * @memberof ProjectsDetailComponent
   */
  loaded = false;
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService) { }

  ngOnInit(): void {
    this.findRequest.pageRequest.page = 0;
    this.findRequest.pageRequest.size = 10;
    this.route.params.subscribe((params: Params) => {
      this.id = params.id; // (+) converts string 'id' to a number
      if (this.id) {
        this.findRequest.filter.id = this.id;
        this.projectService.find(this.findRequest).subscribe(data => {
          if (data.content[0]) {
            this.proyect = data.content[0];
            this.loaded = true;
          }

        });
      }
    });
  }

}
