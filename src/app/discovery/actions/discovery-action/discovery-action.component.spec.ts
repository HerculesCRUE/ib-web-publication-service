import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoveryActionComponent } from './discovery-action.component';

describe('DiscoveryActionComponent', () => {
  let component: DiscoveryActionComponent;
  let fixture: ComponentFixture<DiscoveryActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscoveryActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoveryActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
