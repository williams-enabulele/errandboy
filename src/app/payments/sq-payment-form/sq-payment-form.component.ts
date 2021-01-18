import { Component, OnInit } from '@angular/core';
import { SqPaymentServiceService } from '../sq-payment-service.service'
declare var SqPaymentForm: any;

@Component({
  selector: 'app-sq-payment-form',
  templateUrl: './sq-payment-form.component.html',
  styleUrls: ['./sq-payment-form.component.scss']
})


export class SqPaymentFormComponent implements OnInit {

  paymentForm: any;
  showForm = false;
  nonce: any;
  constructor(
    private sqService: SqPaymentServiceService
  ) { }

  async ngOnInit(): Promise<void> {
    const that = this;
    await this.sqService.loadScript("square-sandbox");
    this.paymentForm = new SqPaymentForm({
      applicationId: 'sandbox-sq0idb-JI0NApk3nQ2jha4vCH7rxA',

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
        cardNonceResponseReceived: function (errors, nonce, cardData) {
          if (errors) {
            // Log errors from nonce generation to the browser developer console.
            console.error('Encountered errors:');
            errors.forEach(function (error) {
              console.error('  ' + error.message);
            });
            alert('Encountered errors, check browser developer console for more details');
            return;
          }
          //console.log(`The generated nonce is:\n${nonce}`);
          that.nonce = `${nonce}`;
          console.log(that.nonce);


          //TODO: Replace alert with code in step 2.1
        }
      }

    });
    this.paymentForm.build();
    this.showForm = true;

  }



  requestCardNonce(event) {

    console.log(event);

    // Don't submit the form until SqPaymentForm returns with a nonce
    event.preventDefault();
    this.paymentForm.requestCardNonce();
    // console.log("believe this" + this.nonce)
  }



}
