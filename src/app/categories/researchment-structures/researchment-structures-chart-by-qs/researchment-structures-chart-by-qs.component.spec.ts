import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { GraphicService } from 'src/app/_services/graphic.service';
import { MockGraphicService } from 'src/app/_services/_testingServices/mockGraphic.service';

import { ResearchmentStructuresByQSComponent } from './researchment-structures-chart-by-qs.component';

describe('SectorChartComponent', () => {
  let component: ResearchmentStructuresByQSComponent;
  let fixture: ComponentFixture<ResearchmentStructuresByQSComponent>;
  let graphicService: MockGraphicService;
  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: GraphicService, useClass: MockGraphicService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchmentStructuresByQSComponent);
    component = fixture.componentInstance;
    graphicService = TestBed.inject(MockGraphicService);
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(graphicService, 'universityQuality').and.callThrough();
    expect(component).toBeTruthy();
  });
});
