import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DriversComponent } from './drivers/drivers.component';
import { DriverDetailsComponent } from './driver-details/driver-details.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AssignComponent } from './assign/assign.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ErrandsComponent } from './errands/errands.component';
import { LoginComponent } from '../auth/login/login.component';
import { AdminLayoutComponent } from '../layouts/admin/admin.component';
import { AuthGuard } from '../_helpers/auth.guard';
import { AddErrandComponent } from './add-errand/add-errand.component';
import { PricingComponent } from './pricing/pricing.component';
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






const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    data: { role: 'Admin' },
    children: [

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'assign', component: AssignComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'transaction/:id', component: TransactionDetailsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'order/:id', component: OrderDetailsComponent },
      { path: 'drivers', component: DriversComponent },
      { path: 'users/:id', component: DriverDetailsComponent },
      { path: 'add-errands', component: AddErrandComponent },
      { path: 'errands', component: ErrandsComponent },
      { path: 'pricing', component: PricingComponent },
      { path: 'coupons', component: OffersComponent },
      { path: 'terms', component: TermsComponent },
      { path: 'privacy', component: PrivacyComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'change-password', component: PasswordComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'users', component: UsersComponent },
      { path: '**', component: NotfoundComponent }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
