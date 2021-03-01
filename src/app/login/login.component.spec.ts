import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { TestingHelper } from '../_helpers/testing.spec';
import { LoginService } from '../_services/login.service';
import { of, throwError } from 'rxjs';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { ToastrService } from 'ngx-toastr';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest().compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*describe('login', () => {
    it('should login user and call get user data', () => {
      const user: User = new User();
      const response: Response = new Response();
      const loginService = fixture.debugElement.injector.get(LoginService);
      const spy = spyOn(loginService, 'login').and.returnValue(of(response));
      const userService = fixture.debugElement.injector.get(UserService);
      const spy2 = spyOn(userService, 'getUserData').and.returnValue(of(user));
      component.login();
      expect(loginService.login).toHaveBeenCalled();
      expect(userService.getUserData).toHaveBeenCalled();
    });

    it('should login user not call get user data', () => {
      const user: User = new User();
      const loginService = fixture.debugElement.injector.get(LoginService);
      const spy = spyOn(loginService, 'login').and.returnValue(of(null));
      const userService = fixture.debugElement.injector.get(UserService);
      const spy2 = spyOn(userService, 'getUserData').and.returnValue(of(user));
      component.login();
      expect(loginService.login).toHaveBeenCalled();
      expect(userService.getUserData).not.toHaveBeenCalled();
    });

    it('it should thorw error on service and show toast', () => {
      const user: User = new User();
      const loginService = fixture.debugElement.injector.get(LoginService);
      const spy = spyOn(loginService, 'login').and.returnValue(throwError({ status: 404 }));
      const toastService = fixture.debugElement.injector.get(ToastrService);
      const spy2 = spyOn(toastService, 'error').and.callThrough();
      component.login();
      expect(toastService.error).toHaveBeenCalled();
    });
  });*/
});
