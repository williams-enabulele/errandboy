import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailpackageFormComponent } from './mailpackage-form.component';

describe('MailpackageFormComponent', () => {
  let component: MailpackageFormComponent;
  let fixture: ComponentFixture<MailpackageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailpackageFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailpackageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
