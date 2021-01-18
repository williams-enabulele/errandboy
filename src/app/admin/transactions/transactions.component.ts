import { Component, OnInit } from '@angular/core';
import { TransactionsService } from './transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactions: any = [];
  p: any = 1;

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



}
