import { TestBed } from '@angular/core/testing';

import { CoacheesApiService } from './coachees-api-service';

describe('CoacheesApiService', () => {
  let service: CoacheesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoacheesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
