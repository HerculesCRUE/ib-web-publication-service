import { TestBed } from '@angular/core/testing';

import { DataImporterService } from './data-importer.service';

describe('DataImporterServiceService', () => {
  let service: DataImporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataImporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
