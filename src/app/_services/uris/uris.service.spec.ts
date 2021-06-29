import { TestBed } from '@angular/core/testing';

import { UrisService } from './uris.service';

describe('UrisService', () => {
  let service: UrisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
