import { TestBed } from '@angular/core/testing';

import { SqPaymentServiceService } from './sq-payment-service.service';

describe('SqPaymentServiceService', () => {
  let service: SqPaymentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SqPaymentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
