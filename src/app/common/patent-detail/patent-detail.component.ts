import { Component, OnInit } from '@angular/core';
import { PatentDetail } from 'src/app/_models/patentDetail';
import { PatentService } from 'src/app/_services/patent.service';

@Component({
  selector: 'app-patent-detail',
  templateUrl: './patent-detail.component.html',
  styleUrls: ['./patent-detail.component.css']
})
export class PatentDetailComponent implements OnInit {
  patentDetail: PatentDetail = new PatentDetail();
  loaded: boolean;
  constructor(private patentService: PatentService) { }

  ngOnInit(): void {
    this.patentService.getPatent('2882').subscribe(data => {
      this.patentDetail = data;
      this.loaded = true;
    });
  }

}
