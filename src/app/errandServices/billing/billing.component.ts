
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SquarepayService } from '../billing/squarepay.service'
import { ActivatedRoute } from '@angular/router';
import { LoadscriptsService } from '../../_helpers/loadscripts.service';
import { DataserviceService } from '../dataservice.service';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CouponService } from './coupon.service';
import { AlertService } from 'ngx-alerts';
import { NgxSpinnerService } from "ngx-spinner";



declare var SqPaymentForm: any;
declare var paypal: any;


@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  @ViewChild('paypal-button') paypalElement: ElementRef;

  paymentForm: any;
  couponForm: FormGroup;
  showForm = true;
  nonce: any;
  showSuccess: boolean;
  showCancel: boolean;
  showError = false;
  state$: any;
  paypalPay = false;
  squarePay = false
  coupon: any;
  showbtn=false;


  data: any = {};
  price: number;
  service: any;
  total: any;
  pickup: any;
  delivery: any;
  distance: any;
  duration: any;
  reference: any;
  location_distance: any;
  destination_address: any;
  origin_address: any;
  travel_duration: any;
  pickupAddress: any;
  dropoffAddress: any;
  location: any;
  service_fee: number ;
  order_no: any;
  customer_id: any;
  discount: number;
  valid_till: any;
  type:any;
  applied:number;
  couponApplied = false;
  form: any;
  

  //Paypal Returned Var on succesful payment
  pp_status: any;
  pp_id: any;
  pp_create_time: any;
  pp_update_time: any;
  pp_amount: any;
  pp_currency: any;
  pp_descriptor: any;
  pp_link: any;
  pp_data: any = {};
  all_data: any = {};





  constructor(
    private sqService: SquarepayService,
    public activated: ActivatedRoute,
    private ls: LoadscriptsService,
    private ds: DataserviceService,
    private authservice: AuthService,
    private fb: FormBuilder,
    private cs: CouponService,
    private alert: AlertService,
    private route: Router,
    private spinner: NgxSpinnerService
  ) { }
  click = false;
  async ngOnInit(): Promise<void> {

   

    const user = this.authservice.decode();
    this.customer_id = user.data['id'];

    this.data = JSON.parse(localStorage.getItem('data'));
   
    //console.log(this.data);
    this.service = this.data.service_errand;
    this.price = this.data.cost;
    this.pickup = this.data.originAddress;
    this.delivery = this.data.destinationAddress;
    this.distance = this.data.location_distance;
    this.duration = this.data.duration;

    this.couponForm = this.fb.group({
      coupon: ['']
    });




    const that = this;
    //await this.sqService.loadScript("square-sandbox");
    await this.sqService.loadScript("square");

    
    this.paymentForm = new SqPaymentForm({
     //applicationId: 'sandbox-sq0idb-JI0NApk3nQ2jha4vCH7rxA',
      applicationId: 'sq0idp-DfvovqF3rZjHSElYpb7esg',
      autoBuild: false,
      
      // Customize the CSS for SqPaymentForm iframe elements
      card: {
        elementId: 'sq-card',
      },
      // SqPaymentForm callback functions
      callbacks: {
        /*
        * callback function: cardNonceResponseReceived
        * Triggered when: SqPaymentForm completes a card nonce request
        */
        cardNonceResponseReceived: function (errors: any[], nonce: any, cardData: any) {
          if (errors) {
            // Log errors from nonce generation to the browser developer console.
            console.error('Encountered errors:');
            errors.forEach(function (error: { message: string; }) {
              console.error('  ' + error.message);
            });
            alert('Encountered errors, fill in details before proceeding');
            return;
          }
          ////console.log(`The generated nonce is:\n${nonce}`);
          that.nonce = `${nonce}`;
          that.form['nonce'] = that.nonce;
          that.createOrder();
          //console.log(that.nonce);
          //TODO: Replace alert with code in step 2.1
        }
      }
    });
    this.showbtn = true;
    this.paymentForm.build();


    this.form = {

      order_no: this.data.order_no,
      service_id: this.data.service_id,
      pickup_date: this.data.pickup_date,
      pickup_time: this.data.pickup_time,
      customer_id: this.customer_id,
      pickup_name: this.data.pickup_name,
      dropoff_name: this.data.dropoff_name,
      duration: this.data.duration,
      cost: this.price,
      location_duration: this.data.location_distance,
      destinationAddress: this.data.destinationAddress,
      fromno: this.data.fromno,
      tono: this.data.tono,
      originAddress: this.data.originAddress,
      quantity: this.data.quantity,
      phone: this.data.phone,
      instructions: this.data.instructions,
      nonce: this.nonce,
      items: this.data.item

    };

    await this.ls.loadScript("paypal");
    // Render the PayPal button into #paypal-button-container
    paypal.Buttons({

      // Set up the transaction
      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [{

            amount: {
              value: that.price
            }
          }]
        });
      },

      onCancel: function (data)  {
        // Show a cancel page, or return to cart
        that.route.navigateByUrl("/");
        localStorage.removeItem('data');
       },
       onError: function (err) {
        // For example, redirect to a specific error page
       
       that.alert.danger("Oops!, something went wrong ,try again ");
      },

      // Finalize the transaction
      onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
          // Show a success message to the buyer
          //console.log(details);

          that.pp_status = details["status"];
          that.pp_id = details["id"];
          that.pp_create_time = details["create_time"];
          that.pp_update_time = details["update_time"];
          that.pp_amount = details["purchase_units"][0]["amount"]["value"];
          that.pp_currency = details["purchase_units"][0]["amount"]["currency_code"];
          that.pp_descriptor =  details["payer"]["payer_id"];
          that.pp_link =  details["links"][0]["href"];


          that.pp_data = {
            transaction_id: that.pp_id, created_at: that.pp_create_time, updated_at: that.pp_update_time, amount: that.pp_amount, currency: that.pp_currency, t_status: that.pp_status, source_type: that.pp_descriptor, receipt_url: that.pp_link
          };

          //console.log(that.pp_data);

          that.all_data = { ...that.form, ...that.pp_data };
          //console.log(that.all_data);
          that.createOrder_paypal();
        });
      }
    }).render('#paypal-button');
  }




  
  requestCardNonce(e) {
    //console.log(e);
    // Don't submit the form until SqPaymentForm returns with a nonce
    e.preventDefault();
    this.paymentForm.requestCardNonce();
    //this.createOrder();
    // //console.log("believe this" + this.nonce)
  }


  createOrder() {
    this.click = true;
    this.spinner.show();
    window.scrollTo(0, 0);
    //console.log(this.form);
    this.ds.create_order(this.form).subscribe(
      res => {
        //console.log(res);
        this.spinner.hide();
        this.click = false;
        this.route.navigateByUrl("/account/result");
        localStorage.removeItem('data');
        //this.alert.success('Your Order has been successfully booked');
      },
      err =>{
        this.spinner.hide();
        this.click = false;
        this.alert.danger("Oops!,something went wrong");

      }
    )

  }
  
clearCart(){
  this.route.navigateByUrl("/");
  localStorage.removeItem('data');
}

  createOrder_paypal() {
    
    window.scrollTo(0, 0);
    this.ds.paypal_paid(this.all_data).subscribe(
      res => {
        
        this.route.navigateByUrl("/account/result");
        localStorage.removeItem('data');
      }
      
    )
  }
  resetStatus() {
    throw new Error('Method not implemented.');
  }



  getCoupons() {
    //console.log(this.couponForm.get('coupon').value);
    this.coupon = this.couponForm.get('coupon').value;
    this.cs.getCoupon(this.coupon, this.customer_id).subscribe(
      res => {
        ////console.log(res);
        this.discount = res["records"]["0"]["discount"];
        this.type = res["records"]["0"]["type"];
        ////console.log(this.discount);
        if (this.type == "percentage") {
          this.price = this.price - (this.price * this.discount/100);
          this.applied = this.price * this.discount/100;
          //update current price 
          let v = localStorage.getItem('data');
          v = v?JSON.parse(v):{};
          v['cost'].value = this.price;
          localStorage.setItem('data',JSON.stringify(v));

          this.couponApplied = true;
          ////console.log(this.price);
        }

        if (this.type == "fixed") {
          this.price = this.price - this.discount;
          this.form['cost'] = this.price;
          this.applied = this.price - (this.price - this.discount);
          this.couponApplied = true;
          ////console.log(this.price);

          //update current price 
          let v = localStorage.getItem('data');
          v =v?JSON.parse(v):{};
          v['cost'].value=this.price;
          localStorage.setItem('data',JSON.stringify(v));

        }

        if (res["records"]["0"]["valid_till"] == "expired") {
          this.discount = 0;
          this.applied = 0;

          this.valid_till = "Oops, this coupon code has expired, try another!";
          this.showError = true;
        }
        if (res["records"]["0"]["valid_till"] == "used") {
          this.discount = 0;
          this.valid_till = "Oops,this coupon code has been used or only applicable to another service";
          this.showError = true;
        }

      }
    )
  }


}
