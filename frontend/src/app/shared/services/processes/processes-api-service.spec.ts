import { TestBed } from '@angular/core/testing';

import { ProcessesApiService } from './processes-api-service';

describe('ProcessesApiService', () => {
  let service: ProcessesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
