import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  datas:any = [];
  status_id:any;
  p:number  = 1;
  formValues:any;
  success=false;
  danger=false;

  constructor(
    private d: DashboardService,
    public alert: AlertService  ) { }

  onChange(status) {
    //console.log(e.value);
    this.status_id = status.value;
  }

  ngOnInit(): void {

    
    this.d.get_users().subscribe(
      res=>{
        this.datas = res['records'];


      }
    )
  }

  reload(){
    this.d.get_users().subscribe(
      res=>{
        this.datas = res['records'];

      }
    )
  }
  delete_user(id){
    this.d.delete_user(id).subscribe(
      res =>{
        this.alert.success("Account successfully deleted");
        this.reload();
        this.success = true ;
      },
      err=>{
        this.danger = true 
      }
    )
  }

  change_astatus(id){
    this.formValues = { id:id, status_id: this.status_id }
    this.d.update_user(this.formValues).subscribe(
      res =>{
       this.success = true ;
        this.reload();
      },
      err=>{
        this.danger = true
      }
    )
  }


  

}
