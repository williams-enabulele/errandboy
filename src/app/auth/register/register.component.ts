import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  phone = false;
  email = true;
  signup: FormGroup;
  displayError = false;
  loading = false;
  error: any;

  get su() { return this.signup.controls; }

  show_phone() {
    this.email = false;
    this.phone = true;
    this.su['email'].disable();
    this.su['phone'].enable();
  }

  show_email() {
    this.phone = false;
    this.email = true;
    this.su['phone'].disable();
    this.su['email'].enable();

  }


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.signup = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]],
      terms: ['', [Validators.required, Validators.requiredTrue]]
    });
    this.su['phone'].disable();

  }

  signUpError(error) {
    this.toastr.error(error, '!Error')

  }
  success() {
    this.toastr.success('You have been successfully registerd, activate your account!', 'Success')
  }

  onSignup() {
    if (this.signup.invalid) {
      return

    }
    //console.log(this.signup.value);
    this.loading = true;
    this.authService.signup(this.signup.value)
      .pipe(first())
      .subscribe(
        data => {

          //console.log(data);
          this.success();
          this.loading = false;
          this.router.navigate(['/auth/account-activation']);
        },
        error => {
          this.toastr.error('Oops!, seems username exist, try another!')
          this.loading = false;
        });
  }


}
