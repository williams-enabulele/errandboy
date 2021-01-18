import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { AccountRoutingModule } from './account-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResultComponent } from './result/result.component';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { OnfileComponent } from './onfile/onfile.component';
import { PasswordComponent } from './password/password.component';
import { StatusComponent } from './status/status.component';




@NgModule({

  declarations: [
    ProfileComponent,
    OrderHistoryComponent,
    DashboardComponent,
    ResultComponent,
    OnfileComponent,
    PasswordComponent,
    StatusComponent

  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    NzResultModule,
    NzEmptyModule,
    ToastrModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NzDropDownModule,
  ]
})
export class AccountModule { }
