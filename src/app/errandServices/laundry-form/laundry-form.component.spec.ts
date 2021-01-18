import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundryFormComponent } from './laundry-form.component';

describe('LaundryFormComponent', () => {
  let component: LaundryFormComponent;
  let fixture: ComponentFixture<LaundryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaundryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaundryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
