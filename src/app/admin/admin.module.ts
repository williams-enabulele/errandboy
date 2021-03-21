import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxEditorModule } from 'ngx-editor';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxPrintModule } from 'ngx-print';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { OrderFilterPipe } from '../_helpers/filter.pipe';





//import { AdminNavComponent } from '../_partials/admin-nav/admin-nav.component';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { DriversComponent } from './drivers/drivers.component';
import { DriverDetailsComponent } from './driver-details/driver-details.component';
import { AssignComponent } from './assign/assign.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ErrandsComponent } from './errands/errands.component';
import { AddErrandComponent } from './add-errand/add-errand.component';
import { AlertModule } from 'ngx-alerts';
import { PricingComponent } from './pricing/pricing.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { OffersComponent } from './offers/offers.component';
import { FaqComponent } from './faq/faq.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { CustomersComponent } from './customers/customers.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { PasswordComponent } from './password/password.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { TransfilterPipe } from '../_helpers/transfilter.pipe';
import { FilterbycustPipe } from '../_helpers/filterbycust.pipe';









@NgModule({
  declarations: [
    DashboardComponent,
    OrdersComponent,
    OrderDetailsComponent,
    DriversComponent,
    DriverDetailsComponent,
    AssignComponent,
    NotfoundComponent,
    ErrandsComponent,
    AddErrandComponent,
    PricingComponent,
    OffersComponent,
    FaqComponent,
    TermsComponent,
    PrivacyComponent,
    CustomersComponent,
    TransactionsComponent,
    TransactionDetailsComponent,
    PasswordComponent,
    ProfileComponent,
    UsersComponent,
    OrderFilterPipe,
    TransfilterPipe,
    FilterbycustPipe

  ],
  providers: [DatePipe],
  imports: [
    CommonModule,
    ChartsModule,
    AdminRoutingModule,
    ToastrModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,
    NgxEditorModule,
    SweetAlert2Module,
    NzDatePickerModule,
    NgScrollbarModule,
    NgxPrintModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000, position: 'right' })
  ]
})
export class AdminModule { }
