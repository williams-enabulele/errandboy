import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BakingFormComponent } from './baking-form.component';

describe('BakingFormComponent', () => {
  let component: BakingFormComponent;
  let fixture: ComponentFixture<BakingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BakingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BakingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
