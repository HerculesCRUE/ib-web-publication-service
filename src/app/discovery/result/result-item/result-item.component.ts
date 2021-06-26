import { Component, Input, OnInit } from '@angular/core';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.css']
})
export class ResultItemComponent implements OnInit {

  @Input() item: any;

  @Input() requestCode: string;

  @Input() userId: string;

  @Input() requestType: string;

  constructor(private _config: NgbAccordionConfig) { }

  ngOnInit(): void {
  }

}
