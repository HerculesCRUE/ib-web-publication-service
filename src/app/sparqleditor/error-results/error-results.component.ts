import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-results',
  templateUrl: './error-results.component.html',
  styleUrls: ['./error-results.component.css'],
})
export class ErrorResultsComponent {
  @Input()
  errorMessage; // private property _data

}
