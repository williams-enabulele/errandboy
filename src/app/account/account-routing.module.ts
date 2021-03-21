import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from '../auth/login/login.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { CustomersLayoutComponent } from '../layouts/customers/customers.component';
import { ResultComponent } from './result/result.component';
import { AuthGuard } from '../_helpers/auth.guard';
import { OnfileComponent } from './onfile/onfile.component';
import { PasswordComponent } from './password/password.component';
import { StatusComponent } from './status/status.component';
import { BillingComponent } from '../errandServices/billing/billing.component';

const routes: Routes = [
  {
    path: '',
    component: CustomersLayoutComponent,
    canActivate: [AuthGuard],
    data: { role: 'Customer' },
    children: [

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'my-orders/:id', component: OrderHistoryComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'result', component: ResultComponent },
      { path: 'save', component: OnfileComponent},
      { path: 'change-password', component: PasswordComponent },
      { path: 'my-transactions', component: PasswordComponent },
      { path: 'order-status', component: StatusComponent },
      { path: 'billing', component: BillingComponent },
      { path: '**', component: LoginComponent }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
