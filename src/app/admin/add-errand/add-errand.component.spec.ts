import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddErrandComponent } from './add-errand.component';

describe('AddErrandComponent', () => {
  let component: AddErrandComponent;
  let fixture: ComponentFixture<AddErrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddErrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddErrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
