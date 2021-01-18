import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@environments/environment';
import { throwError, Observable } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  

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

  read_user() {
    return this.http.get(`${environment.apiUrl}/errandboy_api/controllers/user/read_user.php`, this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  update_user(data: any) {
    return this.http.post(`${environment.apiUrl}/errandboy_api/controllers/auth/update_user.php`, data, this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  create_user(data: any) {
    return this.http.post(`${environment.apiUrl}/errandboy_api/controllers/auth/admin_register.php`, data, this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }



  read_user_one(id: any) {
    return this.http.get(`${environment.apiUrl}/errandboy_api/controllers/auth/read_user_one.php?id=${id}`, this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  delete_user(id: any) {
    return this.http.post(`${environment.apiUrl}/errandboy_api/controllers/auth/delete_user.php`, { 'id': id }, this.httpOptions).pipe(
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
