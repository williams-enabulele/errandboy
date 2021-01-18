import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { AuthService } from '../../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {

  p: number = 1;
  id: any;
  datas: any = [];
  formValues: any;
  status_id: any;
  uid:any;

  constructor(
    private d: DashboardService,
    private authservice: AuthService,
    private route: ActivatedRoute,
    private t: ToastrService
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    const user = this.authservice.decode();
    this.uid = user.data['id'];

    this.d.get_driver_order_one(this.id,this.uid).subscribe(
      res => {
        //console.log(res);
        this.datas = res["records"];
      }
    )
  }

  onChange(status) {
    //console.log(e.value);
    this.status_id = status.value;
  }

  updateStatus() {
    this.formValues = { order_id: this.id, status_id: this.status_id }
    //console.log(this.formValues);
    this.d.updateStatus(this.formValues).subscribe(
      res => {
        //console.log(res);
        this.t.success('successfully updated', 'success')
      }
    )

  }

}
