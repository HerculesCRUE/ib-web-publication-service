import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { TestingHelper } from '../_helpers/testing.spec';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FindRequest } from '../_helpers/search';
import { Helper } from '../_helpers/utils';
import { User } from '../_models/user';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestingHelper.configureTest();
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserService);
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

  describe('findUsers function', () => {
    it('be able to retrieve search with name filter from the API via GET', async () => {
      const respo: Response = new Response();
      const findRequest: FindRequest = new FindRequest();
      findRequest.filter.name = 'flor';
      service.findUsers(findRequest).subscribe(result => {

      });
      const request = httpMock.expectOne(Helper.getUrl('/user/search?name=flor&size=50&page=0'));
      expect(request.request.method).toBe('GET');
      request.flush(respo);
    });

  });

  it('get user by id', async () => {
    const respo: Response = new Response();
    const id = '123';
    service.get(id).subscribe(result => {

    });
    const request = httpMock.expectOne(Helper.getUrl('/user/123'));
    expect(request.request.method).toBe('GET');
    request.flush(respo);
  });

  it('save user with user name flor and make POST call', async () => {
    const respo: Response = new Response();
    const user: User = new User();
    user.name = 'flor';
    user.email = 'test@gamil.com';
    service.save(user).subscribe(result => {

    });
    const request = httpMock.expectOne(Helper.getUrl('/user'));
    expect(request.request.method).toBe('POST');
    expect(request.request.body.name).toBe(user.name);
    request.flush(respo);
  });

  it('update user with user name flor1 and make PUT call', async () => {
    const respo: Response = new Response();
    const user: User = new User();
    user.name = 'flor1';
    user.email = 'test@gamil.com';
    service.update(user).subscribe(result => {

    });
    const request = httpMock.expectOne(Helper.getUrl('/user'));
    expect(request.request.method).toBe('PUT');
    expect(request.request.body.name).toBe(user.name);
    request.flush(respo);
  });

  it('should retreive user data with GET method', async () => {
    const respo: Response = new Response();
    service.getUserData().subscribe(result => {

    });
    const request = httpMock.expectOne(Helper.getUrl('/user'));
    expect(request.request.method).toBe('GET');
    request.flush(respo);
  });


  it('should toggle user active state', async () => {
    const respo: Response = new Response();
    const user: User = new User();
    user.accountNonLocked = true;
    user.id = '123';
    service.toggle(user).subscribe(result => {

    });
    const request = httpMock.expectOne(Helper.getUrl('/user/123/disable'));
    expect(request.request.method).toBe('PUT');
    request.flush(respo);
  });

  it('should toggle user active state', async () => {
    const respo: Response = new Response();
    const user: User = new User();
    user.accountNonLocked = false;
    user.id = '123';
    service.toggle(user).subscribe(result => {

    });
    const request = httpMock.expectOne(Helper.getUrl('/user/123/enable'));
    expect(request.request.method).toBe('PUT');
    request.flush(respo);
  });

});
