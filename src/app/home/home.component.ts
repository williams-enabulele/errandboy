import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
//import { HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { CalDistanceService } from '../_services/cal-distance.service';
import { LatLngBounds } from 'ngx-google-places-autocomplete/objects/latLngBounds';
import { ComponentRestrictions } from 'ngx-google-places-autocomplete/objects/options/componentRestrictions';
import { PricingService } from '../_services/pricing.service';
import { LoadscriptsService } from '../_helpers/loadscripts.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { trigger, transition, useAnimation } from '@angular/animations';
import { slideInLeft } from 'ng-animate';
import { GeneralService } from '../general.service';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';


//import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
//import { pairwise, startWith } from 'rxjs/operators';
var parsed;
var parseAddress;
var parser = require('parse-address');



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbModalConfig, NgbModal, NgbPopoverConfig],
  animations: [
    trigger('slideInLeft', [transition('* => *', useAnimation(slideInLeft))])
  ],
})
export class HomeComponent implements OnInit {

  slideInLeft: any;
  year: any = new Date().getFullYear();



  errandForm: FormGroup;
  submittedData: string;
  isSubmitted: any = false;
  services: any = [];
  data: object;
  loading = true;
  showPrice = false;
  //parse: any;

  /**
      Variables to Distance Calculation
   */
  location_distance;
  destination_address;
  origin_address;
  travel_duration;
  pickupAddress;
  dropoffAddress;
  service;
  location;
  service_fee;

  origin_parse: any;
  destination_parse: any;


  public bounds: LatLngBounds;
  public componentRestrictions: ComponentRestrictions;
  public types: string[];
  public fields: string[];
  public strictBounds: boolean;




  SlideOptions = {
    loop: true, margin: 30, autoplay: true, responsiveClass: true, responsive: {
      0: {
        items: 1
      },
      1650: {
        items: 1
      }
    }, items: 1, dots: true, nav: false
  };
  CarouselOptions = { items: 3, dots: true, nav: true };


  constructor(
    private fb: FormBuilder,
    private caldistance: CalDistanceService,
    private pricingService: PricingService,
    private loadscripts: LoadscriptsService,
    private generalService: GeneralService,
    config: NgbModalConfig,
    confg: NgbPopoverConfig,
    private modalService: NgbModal,


  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
    confg.placement = 'down';
    confg.triggers = 'hover';

  }
  open(content) {
    this.modalService.open(content);
  }

  ngOnInit() {


    //this.loadscripts.loadScript('parse-address');
    this.errandForm = this.fb.group({

      errandService: ['', Validators.required],
      pickupAddress: ['', Validators.required],
      dropoffAddress: ['', Validators.required]

    });

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

  }

  get formControls() { return this.errandForm.controls; }

  // Reset Method for CalDistance
  reset() {
    this.location_distance = null;
    this.destination_address = null;
    this.origin_address = null;
    this.travel_duration = null;

  }

  /*
    async changeDistance() {
      var results = await this.caldistance.calDistance(this.pickupAddress = this.originAddress.nativeElement.value, this.dropoffAddress = this.destinationAddress.nativeElement.value)
      results.subscribe(res => {
        //console.log(res);
        this.location_distance = res['rows']['0']['elements']['0']['distance']['value'];
        this.destination_address = res['destination_addresses'];
        this.origin_address = res['origin_addresses'];
        this.travel_duration = res['rows']['0']['elements']['0']['duration']['text'];
        return this.location_distance;
      });
    }
  */


  async onSubmit() {

    this.isSubmitted = true;

    var results = await this.caldistance.calDistance(this.originAddress.nativeElement.value, this.destinationAddress.nativeElement.value)
    results.subscribe(res => {
      //console.log(res);
      this.location_distance = res['rows']['0']['elements']['0']['distance']['value'];
      this.destination_address = res['destination_addresses'];
      this.origin_address = res['origin_addresses'];
      this.travel_duration = res['rows']['0']['elements']['0']['duration']['text'];

      this.origin_parse = parser.parseLocation(this.origin_address);
      //console.log(this.origin_parse);
      this.destination_parse = parser.parseLocation(this.destination_address);
      //console.log(this.destination_parse);

      //console.log(this.errandService.nativeElement.value, this.location_distance);
      this.pricingService.get_pricing(this.errandService.nativeElement.value, this.location_distance).subscribe(
        price => {
          this.loading = false;
          this.showPrice = true;
          this.service_fee = price['service_price'];
          //console.log(price);
        }
      )

    });



    this.submittedData = JSON.stringify(this.errandForm.value)
    if (this.errandForm.invalid) {
      return;
    }
  }
  // Google Places Reference Directive
  @ViewChild("placesRef") placesRef: GooglePlaceDirective;
  @ViewChild('errandService', { static: false }) errandService: ElementRef;
  @ViewChild('originAddress', { static: false }) originAddress: ElementRef;
  @ViewChild('destinationAddress', { static: false }) destinationAddress: ElementRef;


  public handleAddressChange(address: Address) {
    // Do some stuff
  }







}
