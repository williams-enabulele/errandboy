import { TestBed } from '@angular/core/testing';

import { CalDistanceService } from './cal-distance.service';

describe('CalDistanceService', () => {
  let service: CalDistanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalDistanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
