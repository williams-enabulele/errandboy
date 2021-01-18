import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.scss']
})
export class DriverDetailsComponent implements OnInit {
  id: any = [];
  //: any;

data:any;

  constructor(
    private route: ActivatedRoute,
    private d: DashboardService 
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.d.get_user(this.id).subscribe(
      res=>{
        this.data = res['records'][0];

      }
    )
  }

}
