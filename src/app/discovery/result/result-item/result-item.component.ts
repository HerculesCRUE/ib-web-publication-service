import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.css']
})
export class ResultItemComponent implements OnInit {

  @Input() item: object;

  @Input() requestId: string;

  @Input() userId: string;

  constructor() { }

  ngOnInit(): void {
  }

}
