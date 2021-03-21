import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CouponService } from '../../_services/coupon.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  addCouponForm : FormGroup;
  editCouponForm : FormGroup;
  showEditValues = false;
  displayError: any = false;

  title: string;
  service: string;
  id: any;
  type:any;
  discount: string;
  p: number = 1;

  services: any = [];
  coupons: any = [];
  editcouponById: any = [];
  loading = true;
  editId: any;
  constructor(
    private fb: FormBuilder,
    private couponService: CouponService,
    private alertService: AlertService,
    config: NgbModalConfig, private modalService: NgbModal

  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  //open method for Modal
  open(editCoupon) {
    this.modalService.open(editCoupon);
  }


  ngOnInit(): void {

    this.addCouponForm = this.fb.group({

      title: ['', Validators.required],
      discount: ['', Validators.required],
      service: ['', Validators.required],
      type: ['', Validators.required],
      valid_till: ['', Validators.required],


    });
    this.editCouponForm = this.fb.group({

      title: ['', Validators.required],
      discount: ['', Validators.required],
      service: ['', Validators.required],
      type: ['', Validators.required],
      id: ['', Validators.required],
      valid_till: ['', Validators.required],


    });

    this.couponService.read_coupon().subscribe(
      res => {
        //console.log(res);
        this.coupons = res['records'];
        
      }
    );

    //fetch coupon parameters and values
    this.couponService.get_services().subscribe(
      res => {
        //console.log(res);
        this.services = res['records'];

      }
    );
  }


  showAlerts(): void {
    // For normal messages
    //this.alertService.info('this is an info alert');
    // this.alertService.danger('this is a danger alert');
    this.alertService.success('Coupon successfully saved!');
    // this.alertService.warning('this is a warning alert');

    // For html messages:
    //this.alertService.warning({ html: '<b>This message is bold</b>' });
  }

  reloadCoupon() {
    this.couponService.read_coupon().subscribe(
      res => {
        //console.log(res);
        this.coupons = res['records'];
      })
  }



  deleteCoupon(id:any) {
    ////console.log(id);
    this.couponService.delete_coupon(id).subscribe(
      res => {
        //console.log(res);
        this.alertService.success('Selected Coupon successfully deleted!');
        this.reloadCoupon();
      }
    );
  }
  updateCoupon(form: NgForm) {
    this.couponService.update_coupon(form.value).subscribe(
      res => {
         this.alertService.success("updated!");
        this.reloadCoupon();
       
       
      
      }
      
       
    );
  
  }
ctype:any;
  getcouponById(id: any) {
    //console.log(id);
    this.editId = id;
    this.couponService.read_coupon_one(id).subscribe(
      res => {
        this.loading = false;
        this.showEditValues = true;
        //console.log(res);
        this.editcouponById = res['records'][0];
        this.ctype = res['records'][0]['type'];
      }
    );
  }
  get formControls() { return this.addCouponForm.controls; };


  addcoupon() {
    this.couponService.create_coupon(this.addCouponForm.value).subscribe(
      res => {
        //console.log(res);
        this.alertService.success('Coupon successfully added!');
        this.reloadCoupon();
       //this,addCouponForm.reset(value);

      }
    );
  }

}
