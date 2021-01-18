import { TestBed } from '@angular/core/testing';

import { BakingService } from './baking.service';

describe('BakingService', () => {
  let service: BakingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BakingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
