import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@environments/environment';
import { throwError, Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GeneralService {





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


  get_faqs() {
    return this.http.get(`${environment.apiUrl}/errandboy_api/controllers/faq/read_faq.php`, this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  get_privacy() {
    return this.http.get(`${environment.apiUrl}/errandboy_api/controllers/privacy/read_privacy.php`, this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  get_terms() {
    return this.http.get(`${environment.apiUrl}/errandboy_api/controllers/terms/read_terms.php`, this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

}
