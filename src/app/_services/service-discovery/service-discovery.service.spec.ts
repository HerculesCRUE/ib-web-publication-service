import { TestBed } from '@angular/core/testing';

import { ServiceDiscoveryService } from './service-discovery.service';

describe('ServiceDiscoveryService', () => {
  let service: ServiceDiscoveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceDiscoveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
