import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'ngx-alerts';
import { AssignService } from './assign.service';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.scss']
})
export class AssignComponent implements OnInit {
  editId: any;
  assignService: any;
  assigns: any;
  loading: boolean;
  showEditValues: boolean = false;
  editassignById: any;
  addAssignForm: any;
  editAssignForm: any;
  services: any;
  orders: any = [];
  ord: any;
  drivers: any = [];
  statuss: any = [];
  editdatas: any = [];
  p: number = 1;
  selected: any;
  show = false;
  formvalue: any;
  datas: any;
  showSpinner = true;
  showAfterLoading = false;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    config: NgbModalConfig, private modalService: NgbModal,
    private assign: AssignService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {

    this.addAssignForm = this.fb.group({

      drivers: ['', Validators.required],
      orders: ['', Validators.required],
      status: ['', Validators.required],
    });

    this.editAssignForm = this.fb.group({

      drivers: ['', Validators.required],
      orders: ['', Validators.required],
      status: ['', Validators.required],

    });


    this.assign.get_orders().subscribe(
      res => {
        //console.log(res);
        this.orders = res['records'];
        this.showAfterLoading = true;
      },
      err=>{
        this.showSpinner = false;
      }
    )

    this.assign.get_drivers().subscribe(
      res => {
        //console.log(res);
        this.drivers = res['records'];
        this.showAfterLoading = true;
      },
      err=>{
        this.showSpinner = false;
      }
    )

    this.assign.get_status().subscribe(
      res => {
        //console.log(res);
        this.statuss = res['records'];
        this.showAfterLoading = true;
      },
      err=>{
        this.showSpinner = false;}
    )

    this.assign.get_assigned().subscribe(
      res => {
        this.showSpinner = false;
        this.datas = res['records'];
        this.showAfterLoading = true;
      },
      err =>{
        this.showSpinner = false;
      }
    )


  }

  open(editAssign) {
    this.modalService.open(editAssign);
  }



  filter(value) {
    console.log(value);
  }



  reloadAssign() {
    this.assign.get_assigned().subscribe(
      res => {
        //console.log(res);
        this.datas = res['records'];
      })
  }
  deleteAssign(id: any) {

    this.assign.delete_assign(id).subscribe(


      res => {
        //console.log(res);
        this.alertService.success('Selected assign successfully deleted!');
        this.reloadAssign();
      }
    );
  }
  updateAssign(e: NgForm) {
    this.assign.edit_assign(e.value).subscribe(
      res => {
        this.alertService.success("updated!");
        this.reloadAssign();



      });

  }

  assigned_one(id: any) {

    this.assign.get_assigned_one(id).subscribe(
      res => {
        this.loading = false;
        this.showEditValues = true;
        //console.log(res);
        this.editdatas = res['records'][0];
      }
    );
  }
  get formControls() { return this.addAssignForm.controls; };

  options: any;
  selectedIndex: any;
  alert: any;
  order_id: any;
  order_d: any;
  orderid: any;
  sform: any;

  selected: any;
  display(value) {
    this.show = true;
    this.order_d = JSON.parse(value);
    this.selected = this.order_d.orders;
    this.orderid = this.order_d.id;
  }


  addAssign(f: NgForm) {
    //console.log(f.value.drivers);
    this.formvalue = { drivers: f.value.drivers, orders: this.orderid, status: f.value.status };
    //this.sform = JSON.stringify(this.formvalue);
    //console.log(this.formvalue);
    this.assign.create_assign(this.formvalue).subscribe(
      res => {
        //console.log(res);
        this.alertService.success('Driver successfully assigned!');
        this.reloadAssign();
        f.reset(f.value);
        this.show = false;

      }
    );

  }



}
