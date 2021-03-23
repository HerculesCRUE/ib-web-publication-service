import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { TestingHelper } from '../_helpers/testing.spec';
import { LoginService } from '../_services/login.service';
import { MockLoginService } from '../_services/_testingServices/mockLogin.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest().compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: LoginService, useClass: MockLoginService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, 'redirect').and.callFake(() => { });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('logout', () => {
    it('should log out', () => {

      const loginService = fixture.debugElement.injector.get(LoginService);
      const spy = spyOn(loginService, 'logoutKeyCloak').and.callThrough();
      component.logout();
      expect(loginService.logoutKeyCloak).toHaveBeenCalled();
    });
  });


  describe('login', () => {
    it('should login', () => {
      spyOn(component, 'windowReload').and.callFake(() => { });
      const loginService = fixture.debugElement.injector.get(LoginService);
      const spy = spyOn(loginService, 'loginKC').and.callThrough().withArgs('user', 'pass');
      component.login();
      expect(loginService.loginKC).toHaveBeenCalled();
    });
  });
});
