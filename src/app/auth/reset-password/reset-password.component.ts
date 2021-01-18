import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  verifyForm: FormGroup;
  otpForm: FormGroup;
  passForm: FormGroup;
  showverifyForm = true;
  showotpForm = false;
  showpassForm = false;

  showotp(){
    this.showverifyForm = false;
    this.showpassForm = false;
    this.showotpForm = true;
  }

  showpass(){
    this.showverifyForm = false;
    this.showpassForm = true;
    this.showotpForm = false;
  }


  isSubmitted = false;
  error = "";
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }




  ngOnInit(): void {

    this.verifyForm = this.fb.group({
      otp: [''],
      password: ['', [Validators.required, Validators.email]]

    });

    
    this.passForm = this.fb.group({
     
      password: ['', Validators.required],
      passConfirm: ['', Validators.required],
    });

  }

  onPasswordChange(){
    if (this.passConfirm.value == this.password.value){
      this.passConfirm.setErrors(null);
    } else {
      this.passConfirm.setErrors({ mismatch: true});
    }
  }

  get password(): AbstractControl {
    return this.passForm.controls['password'];
  }

  get passConfirm(): AbstractControl{
    return this.passForm.controls['passConfirm']
  }
  get formControls() { return this.verifyForm.controls; };

  onSubmit() {  
  }

  submit(){

  }

  verifyOtp(){

  }
}
