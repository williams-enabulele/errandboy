import { AuthService } from '../_services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {


  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.authService.decode();
    //console.log("this: ", user.data['role'], next.data['role']);
    if (this.authService.isLoggedIn !== true) {
      this.router.navigate(['/auth/signin'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    else if (user.data['role'] == next.data['role']) {
      return true;
    }

    else {

      this.router.navigate(['/auth/signin']);
      return false
    };

  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.authService.decode();
    //console.log("this: ", user, next);
    if (this.authService.isLoggedIn !== true) {
      this.router.navigate(['/auth/signin'], { queryParams: { 'returnUrl': state.url } });
      return false;
    }
    else if (user.role == next.data['role']) {
      return true;
    }

  }






}
