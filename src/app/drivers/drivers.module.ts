import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { DriversRoutingModule } from './drivers-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssignedOrdersComponent } from './assigned-orders/assigned-orders.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordComponent } from './password/password.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AssignedOrdersComponent,
    OrderStatusComponent,
    ProfileComponent,
    PasswordComponent
  ],
  imports: [
    CommonModule,
    DriversRoutingModule,
    NgxPaginationModule,
    ToastrModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DriversModule { }
