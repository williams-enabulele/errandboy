import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, BehaviorSubject, of, Subject, Subscription } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Role } from '../_models/role';

import { environment } from '@environments/environment';
import { User } from '@app/_models/user';
import { JwtHelperService } from "@auth0/angular-jwt";
const helper = new JwtHelperService();
import { delay } from 'rxjs/operators';




@Injectable({ providedIn: 'root' })
export class AuthService {

  redirectUrl: any;
  timeout: any;
  user: any;
  authToken: any;
  tokenSubscription = new Subscription()
  private userLoggedIn = new Subject<boolean>();



  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private jwtHelper: JwtHelperService
    


  ) { 
    this.userLoggedIn.next(false);
  }


  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('token');
    return (authToken !== null) ? true : false;
  }
  //Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occured:', error.error.message);
    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    //return an observable with a user-facing error message
    return throwError(
      'Oops! something not right, retry with correct credentials');
  }


  loginForm(data: User): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}/errandboy_api/controllers/auth/login.php`, data, this.httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  verify_otp(otp) {
    return this.http.get(`${environment.apiUrl}/errandboy_api/controllers/auth/verify_otp.php?otp=${otp}`, this.httpOptions)
      .pipe(
        
        catchError(this.handleError)
      );
  }
  activate_account(otp) {
    return this.http.get(`${environment.apiUrl}/errandboy_api/controllers/auth/activate_account.php?otp=${otp}`, this.httpOptions)
      .pipe(
        
        catchError(this.handleError)
      );
  }

  forgot_password(data) {
    return this.http.post(`${environment.apiUrl}/errandboy_api/controllers/auth/forgot_password.php`, data, this.httpOptions)
      .pipe(
        
        catchError(this.handleError)
      );
  }

  reset_password(data) {
    return this.http.post(`${environment.apiUrl}/errandboy_api/controllers/auth/reset_password.php`, data, this.httpOptions)
      .pipe(
        
        catchError(this.handleError)
      );
  }


  changePassword(data){
    return this.http.post(`${environment.apiUrl}/errandboy_api/controllers/auth/change_password.php`, data, this.httpOptions)
      .pipe(
        
        catchError(this.handleError)
      );
  }

  newPassword(data){
    return this.http.post(`${environment.apiUrl}/errandboy_api/controllers/auth/new_password.php`, data, this.httpOptions)
      .pipe(
        
        catchError(this.handleError)
      );
  }
  signup(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/errandboy_api/controllers/auth/register.php`, data, this.httpOptions)
      .pipe(
        
        catchError(this.handleError)
      );
  }
  decode() {

    return helper.decodeToken(localStorage.getItem('token'));

  }


  
  setUserLoggedIn(userLoggedIn: boolean) {
    this.userLoggedIn.next(userLoggedIn);
  }

  getUserLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }

 

  expirationCounter(timeout) {
    this.tokenSubscription.unsubscribe();
    this.tokenSubscription = of(null).pipe(delay(timeout)).subscribe((expired) => {
      console.log('EXPIRED!!');
      this.logout();
      //this.router.navigate(['/auth/signin']);
    });
  }

  //After login save token and other values(if any) in localStorage
  setUser(resp: User) {

    //this.timeout = this.jwtHelper.getTokenExpirationDate(resp.token).valueOf() - new Date().valueOf();
    this.authToken = resp.token;
    /* this.user = user;
    this.emit({ username: this.user.username }); */
    //this.expirationCounter(this.timeout);
    localStorage.setItem('token', resp.token);
   
    let params = this.route.snapshot.queryParams;

    if (resp.role == Role.Customer) {


      if (params['returnUrl']) {
        this.redirectUrl = params['returnUrl'];
      }

      if (this.redirectUrl) {
       // console.log(this.redirectUrl);
        this.router.navigateByUrl(this.redirectUrl,).catch(
          () => this.router.navigate(['/billing']))
      } else {

        this.router.navigate(['account/dashboard']).then((e) => {
          if (e) {
            //console.log('success');
          } else {
            //console.log('oops');
          }
        });
      }



    }

    else if (resp.role == Role.Driver) {

      this.router.navigate(['drivers/dashboard']).then((e) => {
        if (e) {
          //console.log('success');
        } else {
          //console.log('oops');
        }
      });

    }
    else if (resp.role == Role.Admin) {
      this.router.navigate(['admin/dashboard']).then((e) => {
        if (e) {
          //console.log('success');
        } else {
          //console.log('oops');
        }
      });

    }

    else {
      //console.log('role not matched')
    }

  }



  logout() {
    // remove user from local storage to log user out
    this.tokenSubscription.unsubscribe();
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/auth/signin']);
   
  }






}