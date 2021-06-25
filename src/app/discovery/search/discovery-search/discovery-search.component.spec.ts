import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverySearchComponent } from './discovery-search.component';

describe('DiscoverySearchComponent', () => {
  let component: DiscoverySearchComponent;
  let fixture: ComponentFixture<DiscoverySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscoverySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
