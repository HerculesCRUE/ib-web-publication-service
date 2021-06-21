import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataImporterComponent } from './data-importer.component';

describe('DataImporterComponent', () => {
  let component: DataImporterComponent;
  let fixture: ComponentFixture<DataImporterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataImporterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataImporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
