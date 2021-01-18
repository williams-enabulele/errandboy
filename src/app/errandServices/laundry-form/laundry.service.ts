import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@environments/environment';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class LaundryService {


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



    checkTime(date: string, time: string) {
        return this.http.get(`${environment.apiUrl}/errandboy_api/controllers/lookup/time_slots/checktime.php?date=${date}&time=${time}`).pipe(
            catchError(this.handleError)
        );
    }



    getCoupon(coupon) {
        return this.http.get(`${environment.apiUrl}/errandboy_api/controllers/coupons/read_coupon_one.php?coupon=${coupon}`).pipe(
            catchError(this.handleError)
        );
    }

    read_timeslots() {
        return this.http.get(`${environment.apiUrl}/errandboy_api/controllers/lookup/time_slots/read_time_slot.php`, this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }
}
