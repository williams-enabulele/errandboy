import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssignedOrdersComponent } from './assigned-orders/assigned-orders.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { DriversLayoutComponent } from '../layouts/drivers/drivers.component';
import { PasswordComponent } from './password/password.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../_helpers/auth.guard';






const routes: Routes = [
  {
    path: '',
    component: DriversLayoutComponent,
    canActivate: [AuthGuard],
    data: { role: 'Driver' },
    children: [

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'change', component: PasswordComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'assigned/:id', component: AssignedOrdersComponent },
      { path: 'status/:id', component: OrderStatusComponent },


    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriversRoutingModule { }
