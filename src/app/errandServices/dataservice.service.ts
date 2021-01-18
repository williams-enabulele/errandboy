import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  private data = {};
  setData(formvalues) {
    this.data = formvalues;
  }

  getData() {
    return this.data;
  }
  constructor(private http: HttpClient) {

  }
  //Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  create_order(data: any) {
    return this.http.post(`${environment.apiUrl}/errandboy_api/controllers/orders/create_order.php`, data, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  paypal_paid(data) {
    return this.http.post(`${environment.apiUrl}/errandboy_api/controllers/orders/create_order_paypal.php`, data, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  get_orders() {

  }




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

}
