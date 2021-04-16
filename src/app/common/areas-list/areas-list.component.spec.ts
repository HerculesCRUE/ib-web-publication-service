import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { AreasService } from 'src/app/_services/areas.service';
import { MockAreaservice } from 'src/app/_services/_testingServices/mockAreas.service';

import { AreasListComponent } from './areas-list.component';

describe('AreasListComponent', () => {
  let component: AreasListComponent;
  let fixture: ComponentFixture<AreasListComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: AreasService, useClass: MockAreaservice }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
