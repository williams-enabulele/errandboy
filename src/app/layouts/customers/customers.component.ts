import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersLayoutComponent implements OnInit {

  
  isCollapsed = true;
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  //isLoggedIn$: Observable<boolean>;
  customer_id: any;
  firstname: any;
  showCart = false;
  data: any;

  constructor(
    private authService: AuthService
  ) { }

  logout() {
    this.authService.logout();
  }
  year: any = new Date().getFullYear();

  ngOnInit() {


    this.data = localStorage.getItem("data");
    if (this.data === null) {
      this.showCart = false;
    }
    else {
      this.showCart = true;
    }
    //this.isLoggedIn$ = this.authService.isLoggedIn;
    const user = this.authService.decode();
    this.customer_id = user.data['id'];
    this.firstname = user.data['firstname'];
    //console.log(this.firstname);

  }
}
