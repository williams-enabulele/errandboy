import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { AuthService } from '../../_services/auth.service';
import { DashboardService } from './dashboard.service';
import getISOWeek from 'date-fns/getISOWeek';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;

  date = null;
  orders: any = [];
  order_month: any = [];
  data_from_db = [];
  collapsed = true;
  customer_id: any;
  firstname: any;
  no_customers: any = []
  no_drivers: any = [];
  no_transactions: any = [];
  no_orders: any = [];
  year: any = new Date().getFullYear();

  constructor(
    private authservice: AuthService,
    private dash: DashboardService,
    private i18n: NzI18nService
  ) { }

  ngOnInit(): void {



    this.getData();
    const user = this.authservice.decode();
    this.customer_id = user.data['id'];
    this.firstname = user.data['firstname'];
    //console.log(this.customer_id, this.firstname);

    this.dash.count_customers().subscribe(
      res => {
        //console.log(res);
        this.no_customers = res['records'][0];
      }
    )

    this.dash.count_drivers().subscribe(
      res => {
        this.no_drivers = res['records'][0];
      }
    )

    this.dash.count_transactions().subscribe(
      res => {
        this.no_transactions = res['records'][0];
      }
    )

    this.dash.count_orders().subscribe(
      res => {
        this.no_orders = res['records'][0];
      }
    )

  }

  getData() {
    return new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(
            this.dash.getLineChartData(this.year).subscribe(
              res => {
                this.data_from_db = res["records"];
                for (var i in this.data_from_db) {
                  console.log(this.data_from_db);
                  this.orders.push(this.data_from_db[i].orders);
                  this.order_month.push(this.data_from_db[i].month);


                }
                this.chart.chart.update();
              }
            )
          );
        }, 2000)

      }
    )
  }

  callLineChart(data: Date) {

    //this.chart.chart.clear();
    this.year = new DatePipe('en-US').transform(data, 'yyyy');
    this.orders.length = 0;
    this.order_month.length = 0;
    this.data_from_db.length = 0;
    this.getData();



  }


  public lineChartData: ChartDataSets[] = [
    {
      data: this.orders,
      label: 'Monthly Orders'
    },
  ];
  public lineChartLabels: Label[] = this.order_month;
  public lineChartOptions: (ChartOptions) = {
    responsive: true
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(45,56,678,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];





}
