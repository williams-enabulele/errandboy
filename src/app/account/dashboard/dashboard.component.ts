import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';
import { NzPlacementType } from 'ng-zorro-antd/dropdown';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  noOrder = true;
  history = false;

  place: NzPlacementType = "bottomCenter";

  customer_id: any;
  returnURL: any;
  datas: any = [];
  p: number = 1;
  userRole:any;
  customer:any;
  cart:any;
  showCart:any;

  constructor(
    private authservice: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private account: AccountService
  ) { }

  ngOnInit(): void {

    this.userRole =this.authservice.decode();
  //console.log(this.userRole);
  if(this.userRole.data['role'] == "Customer"){
    this.customer = true;
  }
  this.cart = localStorage.getItem("data");
  if (this.cart === null) {
    this.showCart = false;
  }
  else {
    this.showCart = true;
  }


    let params = this.route.snapshot.queryParams;
    if (params['returnUrl']) {
      this.returnURL = params['returnUrl'];
    }

    if (this.returnURL) {
      this.router.navigateByUrl(this.returnURL).catch(
        () => this.router.navigate(['/billing']))
    } else {
      this.router.navigate(['account/dashboard'])
    }

    const user = this.authservice.decode();
    this.customer_id = user.data['id'];

    this.account.dash(this.customer_id).subscribe(
      res => {
        this.noOrder = false;
        this.history = true;
        //console.log(res);
        this.datas = res["records"];


      }
    )



  }


}
