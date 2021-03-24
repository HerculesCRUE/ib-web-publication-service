import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { TestingHelper } from '../_helpers/testing.spec';
import { LoginService } from '../_services/login.service';
import { MockLoginService } from '../_services/_testingServices/mockLogin.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest().compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: LoginService, useClass: MockLoginService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
