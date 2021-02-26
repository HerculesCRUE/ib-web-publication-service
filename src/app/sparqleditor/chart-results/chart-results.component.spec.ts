import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartResultsComponent } from './chart-results.component';

describe('BarChartResultsComponent', () => {
  let component: ChartResultsComponent;
  let fixture: ComponentFixture<ChartResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartResultsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
