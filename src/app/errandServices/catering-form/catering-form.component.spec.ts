import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CateringFormComponent } from './catering-form.component';

describe('CateringFormComponent', () => {
  let component: CateringFormComponent;
  let fixture: ComponentFixture<CateringFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CateringFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CateringFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
