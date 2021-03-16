import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { TestingHelper } from '../_helpers/testing.spec';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../_models/user';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestingHelper.configureTest();
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });






  it('get Current User', () => {
    const user: User = new User();
    user.email = 'test@test.com';
    localStorage.setItem('current_user', JSON.stringify(user));
    const currentUser = service.getCurrentUser();
    expect(currentUser.email).toBe('test@test.com');
  });


  it('is Logged In should return if user is logged in', () => {
    const isLog = service.isLoggedIn();
    expect(isLog).toBeFalsy();

  });


});
