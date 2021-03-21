import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Observable } from 'rxjs/';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {


  email:any;
  public isCollapsed = true;
  year: any = new Date().getFullYear();
  sub=false ;

  //isLoggedIn$: Observable<boolean>;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    //this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  listSubscribe(value:NgForm ){
    console.log(value);
    this.sub=true;
  }

}
