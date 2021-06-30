import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoveryControlComponent } from './discovery-control.component';

describe('DiscoveryControlComponent', () => {
  let component: DiscoveryControlComponent;
  let fixture: ComponentFixture<DiscoveryControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscoveryControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoveryControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
