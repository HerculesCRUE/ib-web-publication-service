import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { TestingHelper } from '../_helpers/testing.spec';
import { LoginService } from '../_services/login.service';
import { MockLoginService } from '../_services/_testingServices/mockLogin.service';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest().compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: LoginService, useClass: MockLoginService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('logout', () => {
    it('should call loginService.logout', () => {
      const loginService = fixture.debugElement.injector.get(LoginService);
      const spy = spyOn(loginService, 'logoutKC').and.callThrough();
      component.logout();
      expect(loginService.logoutKC).toHaveBeenCalled();
    });
  });
});
