import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@environments/environment';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssignService {

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



  get_orders() {
    return this.http.get(`${environment.apiUrl}/errandboy_api/controllers/orders/read_order_all.php`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  get_status() {
    return this.http.get(`${environment.apiUrl}/errandboy_api/controllers/status/read_status.php`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  get_drivers() {
    return this.http.get(`${environment.apiUrl}/errandboy_api/controllers/customers/read_drivers_role.php`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  get_assigned() {
    return this.http.get(`${environment.apiUrl}/errandboy_api/controllers/drivers/read_drivers_assign.php`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  get_assigned_one(id) {
    return this.http.get(`${environment.apiUrl}/errandboy_api/controllers/drivers/read_drivers_assign.php?id=${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  create_assign(data) {
    return this.http.post(`${environment.apiUrl}/errandboy_api/controllers/drivers/create_drivers_assign.php`, data).pipe(
      catchError(this.handleError)
    );

  }

  edit_assign(data) {
    return this.http.post(`${environment.apiUrl}/errandboy_api/controllers/drivers/create_drivers_assign.php`, data).pipe(
      catchError(this.handleError)
    );


  }
  delete_assign(id) {
    return this.http.get(`${environment.apiUrl}/errandboy_api/controllers/drivers/delete_drivers_assign.php?id=${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
}
