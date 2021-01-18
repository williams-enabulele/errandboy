import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnfileComponent } from './onfile.component';

describe('OnfileComponent', () => {
  let component: OnfileComponent;
  let fixture: ComponentFixture<OnfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
