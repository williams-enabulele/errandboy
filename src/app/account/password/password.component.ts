import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidators } from 'angular-validation-match';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from '../../_helpers/mustmatch';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  loading=false;
  id: any;
  passForm: FormGroup;
  form: any;
  displayError: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}


  

  ngOnInit(): void {

   

    const user = this.authService.decode();
    this.id = user.data['id'];

    this.passForm = this.fb.group({
      password: ['', [Validators.required,Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]],
      confirm_password: ['', Validators.required ]
    }, {
      validator: MustMatch('password', 'confirm_password')
    });
}


get pf() { return this.passForm.controls; }

  changePassword(){
    this.loading = true;
    if (this.passForm.invalid) {
      
    this.loading = false;
      return;
  }
    this.form = { id: this.id, password: this.passForm.value['password']};
    
    this.authService.changePassword(this.form).subscribe(
      res =>{
        this.loading = false;
        console.log(res);
        this.toastr.success("Password successfully changed");
        this.router.navigateByUrl("/account/dashboard");
      },
      err =>{
        //console.log(err);
        this.loading = false;
        this.toastr.error("Oops! something bad happened, try again.");
      }
    )

  }
}