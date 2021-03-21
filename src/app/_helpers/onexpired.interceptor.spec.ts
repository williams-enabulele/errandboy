import { TestBed } from '@angular/core/testing';

import { OnexpiredInterceptor } from './onexpired.interceptor';

describe('OnexpiredInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      OnexpiredInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: OnexpiredInterceptor = TestBed.inject(OnexpiredInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
