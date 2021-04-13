import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { GraphicService } from 'src/app/_services/graphic.service';
import { MockGraphicService } from 'src/app/_services/_testingServices/mockGraphic.service';

import { ChartResultsComponent } from './chart-results.component';

describe('BarChartResultsComponent', () => {
  let component: ChartResultsComponent;
  let fixture: ComponentFixture<ChartResultsComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      declarations: [ChartResultsComponent],
      providers: [
        { provide: GraphicService, useClass: MockGraphicService }]
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
