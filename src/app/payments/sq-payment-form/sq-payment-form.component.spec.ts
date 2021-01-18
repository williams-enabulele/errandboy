import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SqPaymentFormComponent } from './sq-payment-form.component';

describe('SqPaymentFormComponent', () => {
  let component: SqPaymentFormComponent;
  let fixture: ComponentFixture<SqPaymentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SqPaymentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SqPaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
