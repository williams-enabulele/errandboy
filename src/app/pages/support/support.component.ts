import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupportService } from './support.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  supportForm: FormGroup;
  showAlert = false;
  showErr = false;
  state = false;

  siteKey= "6LcWkhAaAAAAALvD3njY6bG13lAcAN25G0didpnH";un

  constructor(
    private fb: FormBuilder,
    private support: SupportService
  ) { }

  ngOnInit(): void {

    this.supportForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required,Validators.email]],
      depts: ['',Validators.required],
      subject:['', Validators.required],
      message: ['', Validators.required],
      //recaptcha: ['', Validators.required],

    });
  }

  submit() {
    this.state = true;
    this.support.send_mail(this.supportForm.value).subscribe(
      res => {
        this.supportForm.reset();
        this.state =false;
        this.showAlert = true;
        
      },
      err => {
        this.state =false;
        this.showErr = true;
      }
    )
    //console.log(this.supportForm.value);
  }


  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  errored() {
    console.warn(`reCAPTCHA error encountered`);
  }


}
