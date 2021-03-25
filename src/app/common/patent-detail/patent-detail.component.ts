import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private patentService: PatentService,
    private locationS: Location, private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.rutaActiva.snapshot.params.id;
    this.patentService.getPatent(id).subscribe(data => {
      this.patentDetail = data;
      this.loaded = true;
    });
  }


  backClicked() {
    this.locationS.back();
  }

}
