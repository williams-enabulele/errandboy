import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit {
  verifyForm: FormGroup;
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
      otp: ['', Validators.required]

    });

  }


  get formControls() { return this.verifyForm.controls; };

  onSubmit() {
    //console.log(this.verifyForm.value);

    this.authService.activate_account(this.verifyForm.value['otp'])
      .subscribe(res => {
        //console.log(res);
        this.router.navigate(['/auth/signin']);
        this.toastr.success('Your account has been successfully activated!');

      },
        error => {
          //console.log(this.error);
          this.error = error;
          this.loading = false;
          this.toastr.error('Oops! something went wrong, try again');
        });
    this.isSubmitted = true;

  }




}
