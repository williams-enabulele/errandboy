import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPass: FormGroup;
  email = true;
  phone = false;
  get fp() { return this.forgotPass.controls; };
  onErr = false;
  data:any = [];
  loading = false;
  form:any;
  id;

  verifyForm: FormGroup;
  otpForm: FormGroup;
  passForm: FormGroup;
  showverifyForm = true;
  showotpForm = false;
  showpassForm = false;
  showMain = true;



  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router : Router,
    private toastr : ToastrService
  ) { }


  displayError = false;
  ngOnInit(): void {


    this.forgotPass = this.fb.group({

      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/)]],

    });
    this.fp['phone'].disable();

    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });

    
    this.passForm = this.fb.group({
      password: ['', Validators.required],
      passConfirm: ['', Validators.required],
    });
  }






  showPhone() {
    this.email = false;
    this.phone = true;
    this.fp['email'].disable();
    this.fp['phone'].enable();
  }

  showEmail() {
    this.phone = false;
    this.email = true;
    this.fp['phone'].disable();
    this.fp['email'].enable();

  }

  onSubmit() {
    //console.log(this.forgotPass.value);
    this.loading = true;
    this.authService.forgot_password(this.forgotPass.value)
    .subscribe(
      res => {
        this.data = res['records'];
        this.id = this.data[0]["id"];
        //console.log(this.data);
        //this.id = res['records']['id'];
        this.loading = false;
        //console.log(res);
        this.showMain = false;
        this.showotpForm = true;
        //this.router.navigate(['/auth/reset-password']);
        //console.log(res);
      },
      err =>{
        this.loading = false;
        this.onErr = true;
      }
    )
  }

  get password(): AbstractControl {
    return this.passForm.controls['password'];
  }

  get passConfirm(): AbstractControl{
    return this.passForm.controls['passconfirm'];
  }
  get formControls() { return this.verifyForm.controls; };
  onPasswordChange(){
    if (this.passConfirm.value == this.password.value){
      this.passConfirm.setErrors(null);
    } else {
      this.passConfirm.setErrors({ mismatch: true});
    }
  }

  

 
  
 

  verifyOtp(){
    //console.log(this.form);
    this.loading = true;
    this.authService.verify_otp(this.otpForm.value['otp'] ).subscribe(
      res => {
        //console.log(res);
        this.loading = false;
        this.showotpForm = false;
        this.showpassForm = true;
      }, err =>{
        //console.log(err);
        this.onErr = true;
        this.loading = false;
      }
    )

  }

  changePassword(){
    this.loading = true;
    this.form = { id: this.id, password: this.passForm.value['password']};
    this.authService.changePassword(this.form).subscribe(
      res =>{
        this.loading = false;
        console.log(res);
        this.toastr.success("Password successfully changed");
        this.router.navigateByUrl("/auth/signin");
      },
      err =>{
        //console.log(err);
        this.loading = false;
        this.toastr.error("Oops! something bad happened, try again.");
      }
    )

  }

    
   
  

}
