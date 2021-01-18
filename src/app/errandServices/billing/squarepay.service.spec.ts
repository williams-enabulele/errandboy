import { TestBed } from '@angular/core/testing';

import { SquarepayService } from './squarepay.service';

describe('SquarepayService', () => {
  let service: SquarepayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SquarepayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
