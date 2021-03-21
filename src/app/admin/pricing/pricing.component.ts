import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PricingService } from '../../_services/pricing.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class PricingComponent implements OnInit {
  p: number = 1;

  addPriceForm: FormGroup;
  editPriceForm: FormGroup;
  submittedData: string;
  showEditValues = false;
  displayError: any = false;

  base_price: string;
  service: string;
  id: any;
  per_mile: string;


  // Returned arrays from server
  services: any = [];
  pricing: any = [];
  editPriceById: any = [];
  loading = true;
  editId: any;
  constructor(
    private fb: FormBuilder,
    private pricingService: PricingService,
    private alertService: AlertService,
    config: NgbModalConfig, private modalService: NgbModal

  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
    config.size ='lg';
  }
  //open method for Modal
  open(editPricing) {
    this.modalService.open(editPricing);
  }


  ngOnInit(): void {



    this.addPriceForm = this.fb.group({

      base_price: ['', Validators.required],
      per_mile: ['', Validators.required],
      service: ['', Validators.required],
      charges: ['', Validators.required],
      tax: ['', Validators.required],


    });
    this.editPriceForm = this.fb.group({

      base_price: ['', Validators.required],
      per_mile: ['', Validators.required],
      service: ['', Validators.required],
      id: ['', Validators.required],
      charges: ['', Validators.required],
      tax: ['', Validators.required],


    });

    this.pricingService.read_pricing().subscribe(
      res => {
        //console.log(res);
        this.pricing = res['records'];
      }
    );

    //fetch pricing parameters and values
    this.pricingService.get_services().subscribe(
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
    this.alertService.success('Pricing successfully saved!');
    // this.alertService.warning('this is a warning alert');

    // For html messages:
    //this.alertService.warning({ html: '<b>This message is bold</b>' });
  }

  reloadPricing() {
    this.pricingService.read_pricing().subscribe(
      res => {
        //console.log(res);
        this.pricing = res['records'];
      })
  }

  deletePrice(id: any) {
    //console.log(id);
    this.pricingService.delete_pricing(id).subscribe(
      res => {
        //.log(res);
        this.alertService.success('Selected Pricing successfully deleted!');
        this.reloadPricing();
      }
    );
  }
  updatePrice(form: NgForm) {
    this.pricingService.update_pricing(form.value).subscribe(
      res => {
        //.log(res);
        this.alertService.success('Pricing successfully updated!');
        this.reloadPricing();
      }
    );
    //console.log(form.value);
  }

  getPriceById(id: any) {

    this.editId = id;
    this.pricingService.read_pricing_one(id).subscribe(

      res => {
        this.loading = false;
        this.showEditValues = true;
        //console.log(res);
        this.editPriceById = res['records'][0];


      }
    );

  }
  get formControls() { return this.addPriceForm.controls; };
  addPrice() {

    this.pricingService.create_pricing(this.addPriceForm.value).subscribe(
      res => {
        //console.log(res);
        this.alertService.success('Pricing successfully added!');
        this.reloadPricing();

      }
    );
  }

}
