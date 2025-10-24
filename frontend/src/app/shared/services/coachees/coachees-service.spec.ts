import { TestBed } from '@angular/core/testing';

import { CoacheesService } from './coachees-service';

describe('CoacheesService', () => {
  let service: CoacheesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoacheesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
