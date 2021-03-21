import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  laundryForm: FormGroup;
  submittedData: string;
  service: any;
  showForm = false;

  isSubmitted: any = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.service = this.route.snapshot.paramMap.get("service");
    if (this.service == 'laundry') {
      this.showForm = true
    };

    this.laundryForm = this.fb.group({

      tofro: ['', Validators.required],
      to: ['', Validators.required],
      fro: ['', Validators.required],
      p_date: ['', Validators.required],
      p_time: ['', Validators.required],
      p_name: ['', [Validators.required, Validators.minLength(2)]],
      p_address: ['', Validators.required],
      p_apt: ['', Validators.required],
      p_city: ['', Validators.required],
      p_state: ['', Validators.required],
      p_country: ['', Validators.required],
      p_zip: ['', Validators.required],
      d_address: ['', Validators.required],
      d_apt: ['', Validators.required],
      d_city: ['', Validators.required],
      d_state: ['', Validators.required],
      d_country: ['', Validators.required],
      d_zip: ['', Validators.required]
    });
  }

  get formControls() { return this.laundryForm.controls; }

  onSubmit() {
    
    //this.check = this.donateForm.value['amount'] * 100;
    console.log(this.laundryForm.value);
    this.isSubmitted = true;

    this.submittedData = JSON.stringify(this.laundryForm.value)

    //console.log(this.options.amount, this.options.email);

    if (this.laundryForm.invalid) {
      return;
    }

  }


}
