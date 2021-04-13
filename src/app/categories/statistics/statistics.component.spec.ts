import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GraphicComponent } from 'src/app/graphic/graphic.component';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { GraphicService } from 'src/app/_services/graphic.service';
import { StatisticService } from 'src/app/_services/statistic.service';
import { MockGraphicService } from 'src/app/_services/_testingServices/mockGraphic.service';
import { MockStatisticService } from 'src/app/_services/_testingServices/mockStatistic.service';

import { StatisticsComponent } from './statistics.component';

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;
  let statisticService: MockStatisticService;
  let graphicService: MockGraphicService;
  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: StatisticService, useClass: MockStatisticService },
      { provide: GraphicService, useClass: MockGraphicService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
    statisticService = TestBed.inject(MockStatisticService);
    graphicService = TestBed.inject(MockGraphicService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
