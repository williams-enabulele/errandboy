import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { CalDistanceService } from '../../_services/cal-distance.service';
import { LatLngBounds } from 'ngx-google-places-autocomplete/objects/latLngBounds';
import { ComponentRestrictions } from 'ngx-google-places-autocomplete/objects/options/componentRestrictions';
import { PricingService } from '../../_services/pricing.service';
import { DataserviceService } from '../dataservice.service';
import { CateringService } from './catering.service';
import { LoadscriptsService } from '../../_helpers/loadscripts.service';



var parsed: any;
var parseAddress: any;
var parser = require('parse-address');

@Component({
  selector: 'app-catering-form',
  templateUrl: './catering-form.component.html',
  styleUrls: ['./catering-form.component.scss']
})
export class CateringFormComponent implements OnInit {

  showbutton = true;
  showbtnloading = false;

  cateringForm: FormGroup;
  errandForm: FormGroup;
  couponForm: FormGroup;
  submittedData: string;
  displayError = false;
  isSubmitted: any = false;
  services = [];
  time_slots = [];


  data: object;
  loading = true;
  showPrice = false;
  form: any;
  l_distance: any;

  /**
    Variables for Distance Calculation
 */
  location_distance: any;
  destination_address: any;
  origin_address: any;
  travel_duration: any;
  pickupAddress: any;
  dropoffAddress: any;
  service: any;
  location: any;
  service_fee: any;
  order_no: any;

  public bounds: LatLngBounds;
  public componentRestrictions: ComponentRestrictions;
  public types: string[];
  public fields: string[];
  public strictBounds: boolean;
  fromno: any;
  tono: any;




  constructor(
    private fb: FormBuilder,
    private caldistance: CalDistanceService,
    private pricingService: PricingService,
    private loadscripts: LoadscriptsService,
    public router: Router,
    private ds: DataserviceService,
    private bs: CateringService,
   


  ) {

  }

  ngOnInit(): void {
    
    //transaction_id
    this.order_no = 'EB' + Math.ceil(Math.random() * 10e10);

    // Initialise form values 
    this.errandForm = this.fb.group({
      originAddress: ['', Validators.required],
      fromno: ['', Validators.required],
      destinationAddress: ['', Validators.required],
      tono:['', Validators.required]

    });

    this.couponForm = this.fb.group({
      coupon: ['']
    });

    // fetch time slots from service
    this.bs.read_timeslots().subscribe(
      res => {
        //console.log(res);
        this.time_slots = res['records'];
      }
    )

    //fetch pricing parameters and values
    this.pricingService.get_services().subscribe(
      res => {
        //console.log(res);
        this.services = res['records'];
      }
    );

    //Initializing CalDistance variables
    this.location_distance = null;
    this.destination_address = null;
    this.origin_address = null;
    this.travel_duration = null;
    this.service = null;
    this.cateringForm = this.fb.group({


      pickup_name: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      pickup_date: ['', Validators.required],
      pickup_time: ['', Validators.required],
      dropoff_name: ['', Validators.required],
      instructions: [''],
      service_id: ['5'],
      phone: ['', [Validators.required, Validators.pattern(/^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/)]],



    });
  }

  formvalues: any;
  // Google Places order_no Directive
  @ViewChild("placesRef") placesRef: GooglePlaceDirective;
  @ViewChild('errandService', { static: false }) errandService: ElementRef;
  @ViewChild('originAddress', { static: false }) originAddress: ElementRef;
  @ViewChild('destinationAddress', { static: false }) destinationAddress: ElementRef;



  get f() { return this.cateringForm.controls; }




  async getPricing() {
    this.showbutton = false;
    this.showbtnloading = true;
    this.isSubmitted = true;
    ////console.log(this.originAddress.nativeElement.value, this.destinationAddress.nativeElement.value);
    this.fromno  = this.errandForm.value['fromno'];
    this.tono  = this.errandForm.value['tono'];

    var results = await this.caldistance.calDistance(this.originAddress.nativeElement.value, this.destinationAddress.nativeElement.value)
    results.subscribe(res => {
      //console.log(res);
      this.location_distance = res['rows']['0']['elements']['0']['distance']['value'];
      this.l_distance = res['rows']['0']['elements']['0']['distance']['text'];
      this.destination_address = res['destination_addresses']['0'];
      this.origin_address = res['origin_addresses']['0'];
      this.travel_duration = res['rows']['0']['elements']['0']['duration']['text'];

      parsed = parser.parseLocation(this.originAddress.nativeElement.value);
      //console.log(parsed);
      ////console.log(this.location_distance);
      this.pricingService.get_pricing(this.errandService.nativeElement.value, this.location_distance).subscribe(
        price => {
          this.showbutton = true;
          this.showbtnloading = false;
          this.loading = false;
          this.showPrice = true;
          this.service_fee = price['service_price'];
          this.form = { order_no: this.order_no, service_id: "5", service_errand: "catering Pickup and Delivery", cost: this.service_fee, location_distance: this.l_distance, destinationAddress: this.destinationAddress.nativeElement.value, originAddress: this.originAddress.nativeElement.value, duration: this.travel_duration,fromno: this.fromno, tono: this.tono};
          //console.log(price);
        }
      )



    },
      error => {
        this.showbutton = true;
        this.showbtnloading = false;
      });



    this.submittedData = JSON.stringify(this.errandForm.value)
    if (this.errandForm.invalid) {
      return;
    }
  }

  date: any;
  showloading = false;
  showAvailable = false;
  notValid = false;
  message: any;
  onChangeDate(date) {
    this.date = date;
    //console.log(date);
  }
  onChangeTime(time) {
    this.showloading = true;
    //console.log(time, this.date);
    this.bs.checkTime(this.date, time).subscribe(res => {
      //console.log(res);
      this.showloading = false;
      this.showAvailable = true;
      this.message = res['Message'];
      if (this.message === "Sorry time slot fully booked, pick another") {
        this.notValid = true;

      }
      //console.log(this.message);

    });
  }




  //Method to Submit details of orders
  onSubmit() {

    if (this.errandForm.invalid) {
      return;
    }
    //this.check = this.donateForm.value['amount'] * 100;
    ////console.log(this.cateringForm.value);
    this.formvalues = { ...this.form, ...this.cateringForm.value };
    //console.log(this.formvalues);
    this.isSubmitted = true;
    this.billOrder();
    if (this.cateringForm.invalid) {
      return;
    }

  }

  public handleAddressChange(address: Address) {
    // Do some stuff
  }

  //Billing Order Method
  billOrder() {
    localStorage.setItem('data', JSON.stringify(this.formvalues));
    this.ds.setData(this.formvalues);
    this.router.navigateByUrl('billing')
  }
}

