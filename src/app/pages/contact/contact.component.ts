import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  showAlert = false;
  showErr = false;
  state = false;

  siteKey= "6LcWkhAaAAAAALvD3njY6bG13lAcAN25G0didpnH";un

  constructor(
    private fb: FormBuilder,
    private contact: ContactService
  ) { }

  ngOnInit(): void {

    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required,Validators.email]],
      phone: ['', Validators.pattern(/^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/)],
      altPhone: ['', Validators.pattern(/^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/)],
      referals: ['', Validators.minLength(3)],
      message: ['', Validators.required],
      recaptcha: ['', Validators.required],

    });
  }

  submit() {
    this.state = true;
    this.contact.send_mail(this.contactForm.value).subscribe(
      res => {
        this.contactForm.reset();
        this.state =false;
        this.showAlert = true;
        
      },
      err => {
        this.state =false;
        this.showErr = true;
      }
    )
    //console.log(this.contactForm.value);
  }


  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  errored() {
    console.warn(`reCAPTCHA error encountered`);
  }

}
