import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@environments/environment';
import { throwError, Observable } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }

  constructor(private http: HttpClient) { }

  //Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  dash(id) {
    return this.http.get(`${environment.apiUrl}/errandboy_api/controllers/orders/read_order_one.php?id=${id}`, this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  updateStatus(data) {
    return this.http.post(`${environment.apiUrl}/errandboy_api/controllers/orders/update_order_one.php`, data, this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );

  }

readProfile(id) {
    return this.http.get(`${environment.apiUrl}/errandboy_api/controllers/auth/read_profile_one.php?id=${id}`, this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  createProfile(data){
    return this.http.post(`${environment.apiUrl}/errandboy_api/controllers/auth/create_profile.php`, data,this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  updateProfile(data){
    return this.http.post(`${environment.apiUrl}/errandboy_api/controllers/auth/update_profile.php`, data,this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

}
