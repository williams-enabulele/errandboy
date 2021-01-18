import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: any = [];
  p:any =1;
  constructor(
    private orderService: OrdersService
  ) { }

  ngOnInit(): void {

    this.orderService.get_orders().subscribe(
      res => {
        this.orders = res['records'];
      }
    )

  }



}
