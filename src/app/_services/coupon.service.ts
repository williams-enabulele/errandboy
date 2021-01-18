import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@environments/environment';
import { throwError, Observable } from 'rxjs';
import { catchError,retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CouponService {


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      //console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      //console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
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

  

  read_coupon() {
    return this.http.get(`${environment.apiUrl}/errandboy_api/controllers/coupons/read_coupon.php`, this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  update_coupon(data: any) {
    return this.http.post(`${environment.apiUrl}/errandboy_api/controllers/coupons/update_coupon.php`, data, this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  create_coupon(data: any) {
    return this.http.post(`${environment.apiUrl}/errandboy_api/controllers/coupons/create_coupon.php`, data, this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }



  read_coupon_one(id: any) {
    return this.http.get(`${environment.apiUrl}/errandboy_api/controllers/coupons/read_one.php?id=${id}`, this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  delete_coupon(id: any) {
    return this.http.post(`${environment.apiUrl}/errandboy_api/controllers/coupons/delete_coupon.php`, { 'id': id }, this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }


  get_services() {
    return this.http.get(`${environment.apiUrl}/errandboy_api/controllers/errands/read_errand.php`, this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  get_roles() {
    return this.http.get(`${environment.apiUrl}/errandboy_api/controllers/auth/read_roles.php`, this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

}
