import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { GraphicService } from 'src/app/_services/graphic.service';
import { MockGraphicService } from 'src/app/_services/_testingServices/mockGraphic.service';

import { AreasComponent } from './areas.component';

describe('ResearchCategoriesComponent', () => {
  let component: AreasComponent;
  let fixture: ComponentFixture<AreasComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: GraphicService, useClass: MockGraphicService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
