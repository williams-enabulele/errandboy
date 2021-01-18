import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  p: number = 1;
  id: any;
  datas: any = [];
  dash: any = [];
  total: number;
  showRecords = false;
  showNoRecord= false;

  constructor(
    private d: DashboardService,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {




    const user = this.authservice.decode();
    this.id = user.data['id'];
    this.d.get_assign_by_id(this.id).subscribe(
      res => {
        //console.log(res);
        this.showRecords = true ;
        this.datas = res["records"];
      },
      err=>{
        this.showNoRecord = true;
      }
    )



    this.d.dash(this.id).subscribe(
      res => {
        this.dash = res["records"][0];
        this.total = this.dash['pending'] + this.dash['progress'] + this.dash['completed'];
      }
    )







  }

}
