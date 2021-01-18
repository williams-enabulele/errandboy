import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import { UsersService } from '../../_services/users.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {


  DriverForm: FormGroup;
  submittedData: string;
  displayError: any = false;
  gpassword: any;
  roles: any = [];
  phone = false;
  email = true;





  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {

    this.DriverForm = this.fb.group({

      firstname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]

    });

    //fetch user parameters and values
    this.userService.get_roles().subscribe(
      res => {
        //console.log(res);
        this.roles = res['records'];
      }
    );

    this.formControls['phone'].disable();

  }

  get formControls() { return this.DriverForm.controls; }

  show_phone() {
    this.email = false;
    this.phone = true;
    this.formControls['email'].disable();
    this.formControls['phone'].enable();
  }

  show_email() {
    this.phone = false;
    this.email = true;
    this.formControls['phone'].disable();
    this.formControls['email'].enable();

  }


  onSubmit() {

    this.userService.create_user(this.DriverForm.value).subscribe(
      res => {
        this.alertService.success("Successfully added a new user")
      },
      (err) => {
        this.alertService.danger("Oops!, request failed");
      }
    )



  }

  generate() {
    this.gpassword = this.generateP();
  }


  generateP() {

    var pass = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
      'abcdefghijklmnopqrstuvwxyz0123456789@#$';

    for (let i = 1; i <= 8; i++) {
      var char = Math.floor(Math.random()
        * str.length + 1);

      pass += str.charAt(char)
    }

    return pass;
  }

  showAlerts(): void {
    // For normal messages
    //this.alertService.info('this is an info alert');
    // this.alertService.danger('this is a danger alert');
    this.alertService.success('Password Copied!');
    // this.alertService.warning('this is a warning alert');

    // For html messages:
    //this.alertService.warning({ html: '<b>This message is bold</b>' });
  }

  copy() {
    const el = document.createElement('textarea');
    el.value = this.gpassword;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    this.showAlerts();
    document.body.removeChild(el);


  }

}