import { TestBed } from '@angular/core/testing';

import { FullScreen } from './full-screen';

describe('FullScreen', () => {
  let service: FullScreen;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullScreen);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
