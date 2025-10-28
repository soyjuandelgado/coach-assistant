import { TestBed } from '@angular/core/testing';

import { ErrorText } from './error-text';

describe('ErrorText', () => {
  let service: ErrorText;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorText);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
