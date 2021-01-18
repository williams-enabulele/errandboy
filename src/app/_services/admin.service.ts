import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@environments/environment';
import { throwError, Observable } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {






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

  update_faq(data) {
    return this.http.post(`${environment.apiUrl}/errandboy_api/controllers/faq/update_faq.php`, data, this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  create_faq(data: any) {
    return this.http.post(`${environment.apiUrl}/errandboy_api/controllers/faq/create_faq.php`, data, this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }



  get_faq_one(id: any) {
    return this.http.get(`${environment.apiUrl}/errandboy_api/controllers/faq/read_faq_one.php?id=${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  delete_faq(id: any) {
    return this.http.post(`${environment.apiUrl}/errandboy_api/controllers/faq/delete_faq.php`, { 'id': id }, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }




  get_privacy() {
    return this.http.get(`${environment.apiUrl}/errandboy_api/controllers/privacy/read_privacy.php`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  update_privacy(data) {
    return this.http.post(`${environment.apiUrl}/errandboy_api/controllers/privacy/update_privacy.php`, data, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  create_privacy(data: any) {
    return this.http.post(`${environment.apiUrl}/errandboy_api/controllers/privacy/create_privacy.php`, data, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }



  get_privacy_one(id: any) {
    return this.http.get(`${environment.apiUrl}/errandboy_api/controllers/privacy/read_privacy_one.php?id=${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  delete_privacy(id: any) {
    return this.http.post(`${environment.apiUrl}/errandboy_api/controllers/privacy/delete_privacy.php`, { 'id': id }, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }



  get_terms() {
    return this.http.get(`${environment.apiUrl}/errandboy_api/controllers/terms/read_terms.php`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  update_terms(data) {
    return this.http.post(`${environment.apiUrl}/errandboy_api/controllers/terms/update_terms.php`, data, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  create_terms(data: any) {
    return this.http.post(`${environment.apiUrl}/errandboy_api/controllers/terms/create_terms.php`, data, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }



  get_terms_one(id: any) {
    return this.http.get(`${environment.apiUrl}/errandboy_api/controllers/terms/read_terms_one.php?id=${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  delete_terms(id: any) {
    return this.http.post(`${environment.apiUrl}/errandboy_api/controllers/terms/delete_terms.php`, { 'id': id }, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }




}