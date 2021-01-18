import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { WatchService } from '../../_services/watch.service';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from 'ngx-alerts';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  loginError = false;
  submitted = false;
  returnUrl: string;
  error = '';
  alert_login = false;

  displayError = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private alert: AlertService,
    private watch: WatchService,
  ) { }

  ngOnInit(): void {

    //this.authService.logout();
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    let params = this.route.snapshot.queryParams;
    if (params['returnUrl']) {
      this.alert_login = true
        ;
    }
  }


  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    //console.log(this.loginForm.value);
    this.authService.loginForm(this.loginForm.value)
      .subscribe(response => {
        //console.log(response);
        if (response.status == 'Success') {
          this.authService.setUser(response);
          this.watch.setUserLoggedIn(true);
          this.alert.success("Successfully logged in!");
          //console.log(this.authService.decode());
        }
      },
        error => {
          this.loginError = true;
          this.loading = false;
        });
  }


}
