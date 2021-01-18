import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailpackageComponent } from './mailpackage.component';

describe('MailpackageComponent', () => {
  let component: MailpackageComponent;
  let fixture: ComponentFixture<MailpackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailpackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailpackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
