import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GraphicService } from 'src/app/_services/graphic.service';
import { MockGraphicService } from 'src/app/_services/_testingServices/mockGraphic.service';

import { ResultsComponent } from './results.component';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ResultsComponent],
      imports: [TabsModule.forRoot(), TranslateModule.forRoot()],
    }).compileComponents();
    TestBed.configureTestingModule({
      providers: [
        { provide: GraphicService, useClass: MockGraphicService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change tab selected if tab is enabled', () => {
    component.changeTab('scientis', false);
    expect(component.activeTab).toBe('scientis');
  });

  it('should not change tab selected if tab is disabled', () => {
    component.changeTab('scientis', true);
    expect(component.activeTab).toBe('table');
  });
});
