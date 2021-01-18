import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversLayoutComponent implements OnInit {


  driver_id: any;
  firstname: any;
  year: any = new Date().getFullYear();

  isCollapsed = true;
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

    logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    //this.isLoggedIn$ = this.authService.isLoggedIn;
    const user = this.authService.decode();
    this.driver_id = user.data['id'];
    this.firstname = user.data['firstname'];
    //console.log(this.firstname);
  }
}
