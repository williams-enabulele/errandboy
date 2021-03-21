import { Component, OnInit } from '@angular/core';
import { TransactionsService } from './transactions.service';
import { TransfilterPipe } from '../../_helpers/transfilter.pipe';
import { FilterbycustPipe } from '../../_helpers/filterbycust.pipe';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  providers:[FilterbycustPipe,TransfilterPipe],
  
})
export class TransactionsComponent implements OnInit {

  transactions: any = [];
  p: any = 1;
  order_no:any;
  customer_id:any;
  selectedOptions:any;
  showOrderDiv =true;
  showCustDiv = false;


  constructor(
    private t: TransactionsService
  ) { }

  ngOnInit(): void {

    this.t.get_transactions().subscribe(
      res => {
        this.transactions = res["records"];
      }
    )

  }

showhide(){
  if(this.selectedOptions == "2" ){
    this.showCustDiv = true;
    this.showOrderDiv = false;
  } else{
    this.showOrderDiv = true;
    this.showCustDiv = false;
  }
}

}
