import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { TestingHelper } from '../_helpers/testing.spec';
import { LoginService } from '../_services/login.service';
import { MockLoginService } from '../_services/_testingServices/mockLogin.service';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest().compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: LoginService, useClass: MockLoginService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toggleMenu', () => {
    it('should toggle isMenuCollapsed value to true', () => {
      component.toggleMenu();
      expect(component.isMenuCollapsed).toBeTruthy();
    });
  });
});
