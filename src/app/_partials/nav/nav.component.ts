import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Observable } from 'rxjs/';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {



  public isCollapsed = true;
  public isDropdown = true;
  //isLoggedIn$: Observable<boolean>;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    //this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onlogOut() {
    this.authService.logout();
  }


}
