import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TermsComponent } from './pages/terms/terms.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { AboutComponent } from './pages/about/about.component';
import { FaqComponent } from './pages/faq/faq.component';
import { BakingComponent } from './errandServices/baking/baking.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { OrderComponent } from './pages/order/order.component';
import { BillingComponent } from './errandServices/billing/billing.component';
import { BakingFormComponent } from './errandServices/baking-form/baking-form.component';
import { CateringComponent } from './errandServices/catering/catering.component';
import { CateringFormComponent } from './errandServices/catering-form/catering-form.component';
import { LaundryComponent } from './errandServices/laundry/laundry.component';
import { LaundryFormComponent } from './errandServices/laundry-form/laundry-form.component';
import { MailpackageComponent } from './errandServices/mailpackage/mailpackage.component';
import { MailpackageFormComponent } from './errandServices/mailpackage-form/mailpackage-form.component';
import { PrescriptionComponent } from './errandServices/prescription/prescription.component';
import { PrescriptionFormComponent } from './errandServices/prescription-form/prescription-form.component';
import { StoreComponent } from './errandServices/store/store.component';
import { StoreFormComponent } from './errandServices/store-form/store-form.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AuthGuard } from './_helpers/auth.guard';
import { SupportComponent } from './pages/support/support.component';


const routes: Routes = [

  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: '', component: HomeComponent },
      { path: 'terms', component: TermsComponent },
      { path: 'support', component: SupportComponent },
      { path: 'billing', component: BillingComponent, canActivate: [AuthGuard], data: { role: 'Customer' } },
      { path: 'services/baking', component: BakingComponent },
      { path: 'orders/baking', component: BakingFormComponent },
      { path: 'services/catering', component: CateringComponent },
      { path: 'orders/catering', component: CateringFormComponent },
      { path: 'services/laundry', component: LaundryComponent },
      { path: 'orders/laundry', component: LaundryFormComponent },
      { path: 'services/mail-package', component: MailpackageComponent },
      { path: 'orders/mail-package', component: MailpackageFormComponent },
      { path: 'services/prescription', component: PrescriptionComponent },
      { path: 'orders/prescription', component: PrescriptionFormComponent },
      { path: 'services/store-purchase', component: StoreComponent },
      { path: 'orders/store-purchase', component: StoreFormComponent },
      { path: 'privacy', component: PrivacyComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'about', component: AboutComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'services/laundry', component: LaundryComponent },
      
      { path: 'services/order', component: OrderComponent },
    ]
  },

  {
    path: 'account',
    loadChildren: () => import(`./account/account.module`).then((m) => m.AccountModule),

  },
  {
    path: 'drivers',
    loadChildren: () => import(`./drivers/drivers.module`).then((m) => m.DriversModule),
  },
  {
    path: 'admin',
    loadChildren: () => import(`./admin/admin.module`).then((m) => m.AdminModule),
  },
  {
    path: 'auth',
    loadChildren: () => import(`./auth/auth.module`).then((m) => m.AuthModule)

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
