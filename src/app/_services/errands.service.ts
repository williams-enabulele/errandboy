
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ErrandsService {
  read_pricing_one(id: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  addErrand(title: string, excerpt: string, description: string, image: File): Observable<any> {

    var formData: any = new FormData();
    formData.append("title", title);
    formData.append("excerpt", excerpt);
    formData.append("description", description);
    formData.append("image", image);

    return this.http.post(`${environment.apiUrl}/errandboy_api/controllers/errands/create_errand.php`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      
      catchError(this.errorMgmt)
    )
  }


  getServices() {
    return this.http.get(`${environment.apiUrl}/errandboy_api/controllers/errand_services/read_services.php`).pipe(
      
      catchError(this.errorMgmt)
    );
  }

  getServicesById(id) {
    return this.http.get(`${environment.apiUrl}/errandboy_api/controllers/errands/read_errand_one.php?id=${id}`).pipe(
      
      catchError(this.errorMgmt)
    );
  }

  deleteServiceById(id) {
    return this.http.get(`${environment.apiUrl}/errandboy_api/controllers/errands/delete_services.php?id=${id}`).pipe(
      
      catchError(this.errorMgmt)
    );
  }

  updateService(data) {
    return this.http.post(`${environment.apiUrl}/errandboy_api/controllers/errand_services/update_service.php`, data).pipe(
      
      catchError(this.errorMgmt)
    );
  }



  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //console.log(errorMessage);
    return throwError(errorMessage);
  }

}