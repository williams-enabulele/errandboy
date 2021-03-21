import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { WatchService } from '../../_services/watch.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {
  showCart = false;
  data: any;
  loggedIn = false;
  isLoggedIn: any;
  showlogout: boolean;
  admin = false;
  drivers = false;
  account = false;
  showHome = false;
  login:boolean;
  signup:boolean;
  year: any = new Date().getFullYear();
  constructor(
    private auth: AuthService,
    private router: Router,
    private watch : WatchService
  ) {
    
    this.watch.setUserLoggedIn(false);
    
    this.router.events.subscribe(
      (ev) =>{
        if( ev instanceof NavigationStart){

          if(this.router.url!="/"){
      
            this.showHome = true;
          }
          else{
            this.showHome = false;
          }

        }      }
    )
    
  }



  collapsed = true;
  userRole:any;

  logOut() {
    this.auth.logout();
  }

  ngOnInit(): void {

    this.login=true;
    this.signup=true;


    this.data = localStorage.getItem("data");
    if (this.data === null) {
      this.showCart = false;
    }
    else {
      this.showCart = true;
    }


  this.userRole =this.auth.decode();
  //console.log(this.userRole);
  if(this.userRole.data['role'] == "Admin"){
    this.admin = true;
  }
else if (this.userRole.data['role'] == "Driver"){

  this.drivers = true

} else if (this.userRole.data['role'] == "Customer"){
  this.account = true;
}
 try { 
   if(
    this.isLoggedIn = localStorage.getItem("token") === null
    ){
      this.showlogout = true;
      this.loggedIn = false;
      this.login=true;
      this.signup=true;
    } else{
      
  this.showlogout = false;
  this.loggedIn = true;
  this.login=false;
  this.signup=false;
    }
     
 } catch (error) {
   console.log(error);
 }

  }


 

}
