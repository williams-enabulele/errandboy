import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { OrderFilterPipe } from '../../_helpers/filter.pipe';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers:[OrderFilterPipe]
})
export class OrdersComponent implements OnInit {

  orders: any = [];
  p:any =1;
  sorders:any;
  showDetails: boolean;
  loading: boolean;
  input:any;
  constructor(
    private orderService: OrdersService,
    
  ) { }

  ngOnInit(): void {

    this.orderService.get_orders().subscribe(
      res => {
        this.loading = false;
        this.showDetails = true;
        this.orders = res['records'];
      }
    )

    

  }



}
