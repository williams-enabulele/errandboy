import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../dashboard.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild('f') profile : NgForm;
  id: any;
  loading = false;
  uProfile:any = [];
  updateBtn = false;
  createBtn = true;
  data:any;

  firstname:any;
  email:any;
  phone:any;
  address:any;
  city:any;
  state:any;
  aptno:any;
  zip:any;

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private toastr: ToastrService,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    

    const user = this.authservice.decode();
    this.id = user.data['id'];

    this.readProfile();

    

    if(this.firstname!=''){
      this.updateBtn = true;
      this.createBtn = false  
    }

    

  }

  createProfile(f: NgForm){

    
    this.loading = true;
    this.dashboardService.createProfile(f.value).subscribe(
      res =>
      {
        this.loading = false;
        this.toastr.success("Profile successfully saved");
      },
      err=>{
        this.loading = false
        this.toastr.error("Oops!, something bad happened, try again");
      }
      
    )
  }


  updateProfile(f: NgForm){
    console.log(f.value);
    this.loading = true;
    this.dashboardService.updateProfile(f.value).subscribe(
      res =>
      {
        this.loading = false;
        this.toastr.success("Profile successfully saved");
      },
      err=>{
        this.loading = false
        this.toastr.error("OOps!, something bad happened, try again");
      }
      
    )
  }

  readProfile(){
    this.loading = true;
    this.dashboardService.readProfile(this.id).subscribe(
      res =>
      {
       
        this.uProfile = res["records"][0];
        this.firstname = this.uProfile.firstname;
        this.email = this.uProfile.email;
        this.phone = this.uProfile.phone;
        this.address = this.uProfile.address;
        this.city = this.uProfile.city;
        this.state  = this.uProfile.state;
        this.zip  = this.uProfile.zip;
        this.aptno = this.uProfile.aptno;
        //console.log(this.firstname);
        this.loading = false;
        
      },
      err=>{
        this.loading = false
       
      }
      
    )
  }


  get f() { return this.profile.controls; };
}
