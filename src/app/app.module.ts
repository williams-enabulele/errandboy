import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule } from "@auth0/angular-jwt";

export function tokenGetter() {
   return localStorage.getItem("token");
}
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { OwlModule } from 'ngx-owl-carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule, IConfig } from 'ngx-mask';
export let options: Partial<IConfig> | (() => Partial<IConfig>);
import { ChartsModule } from 'ng2-charts';
import { NgxEditorModule } from 'ngx-editor';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { menu, placeholder, schema } from 'ngx-editor';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzResultModule } from 'ng-zorro-antd/result';



import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './layouts/admin/admin.component';
import { CustomersLayoutComponent } from './layouts/customers/customers.component';
import { DriversLayoutComponent } from './layouts/drivers/drivers.component';



import { AppRoutingModule } from './app-routing.module';
import { UserIdleModule } from 'angular-user-idle';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { NavComponent } from './_partials/nav/nav.component';
import { FooterComponent } from './_partials/footer/footer.component';
import { TermsComponent } from './pages/terms/terms.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { AboutComponent } from './pages/about/about.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ScrollspyDirective } from './_helpers/scrollspy.directive';
import { AlertModule } from 'ngx-alerts';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SidebarModule } from 'ng-sidebar';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { DriversComponent } from './drivers/drivers.component';
import { OrderComponent } from './pages/order/order.component';
import { BakingComponent } from './errandServices/baking/baking.component';
import { BakingFormComponent } from './errandServices/baking-form/baking-form.component';
import { BillingComponent } from './errandServices/billing/billing.component';
import { DataserviceService } from './errandServices/dataservice.service';
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
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';
import { NgxSpinnerModule } from "ngx-spinner";
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { AvatarModule } from 'ngx-avatar';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
import { SupportComponent } from './pages/support/support.component';
import { TokeninterceptorService } from './_services/tokeninterceptor.service';
//import { OnexpiredInterceptor } from './_helpers/onexpired.interceptor';



registerLocaleData(en);



//import { FontAwesomeModule } from '@fortawesome/fontawesome-free';
@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      AuthComponent,
      NavComponent,
      FooterComponent,
      AccountComponent,
      TermsComponent,
      PrivacyComponent,
      AboutComponent,
      FaqComponent,
      ScrollspyDirective,
      LaundryComponent,
      ContactComponent,
      AdminComponent,
      DriversComponent,


      HomeLayoutComponent,
      AuthLayoutComponent,
      AdminLayoutComponent,
      CustomersLayoutComponent,
      DriversLayoutComponent,
      OrderComponent,
      BakingComponent,
      BakingFormComponent,
      BillingComponent,
      CateringComponent,
      CateringFormComponent,
      LaundryFormComponent,
      MailpackageComponent,
      MailpackageFormComponent,
      PrescriptionComponent,
      PrescriptionFormComponent,
      StoreComponent,
      StoreFormComponent,
      SupportComponent,
     // OnexpiredInterceptor


   ],
   imports: [
      BrowserModule,
      SidebarModule.forRoot(),
      HttpClientModule,
      NzLayoutModule,
      AppRoutingModule,
      NgbModule,
      OwlModule,
      AvatarModule,
      NzMenuModule,
      ModalModule.forRoot(),
      NzBreadCrumbModule,
      NzIconModule,
      NzToolTipModule,
      NzAffixModule,
      NzResultModule,
      NzDropDownModule,
      MomentModule,
      NzButtonModule,
      NgxSpinnerModule,
      ChartsModule,
      NgIdleKeepaliveModule.forRoot(),
      FormsModule,
      SweetAlert2Module.forRoot(),
      AlertModule.forRoot({ maxMessages: 5, timeout: 5000, position: 'right' }),
      ReactiveFormsModule,
      RecaptchaFormsModule,
      RecaptchaModule,
      GooglePlaceModule,
      HttpClientModule,
      BrowserAnimationsModule,
      NgxMaskModule.forRoot(),
      ToastrModule.forRoot(),
      AnimateOnScrollModule.forRoot(),
      NgxEditorModule.forRoot({
         schema, // optional scheama, see https://sibiraj.dev/ngx-editor/additional-documentation/schema.html
         plugins: [
            menu({
               // default options (Optional)
               toolbar: [
                  ['bold', 'italic', 'code'], // inline icons
                  ['ordered_list', 'bullet_list'],
                  [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }] // dropdown

               ],
               labels: {
                  bold: 'Bold',
                  italics: 'Italics',
                  code: 'Code',
                  ordered_list: 'Ordered List',
                  bullet_list: 'Bullet List',
                  heading: 'Heading'
               }
            }),
            placeholder('Type something here...')
         ],
         nodeViews: {} // optional, see https://prosemirror.net/examples/footnote/
      }),

      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ["localhost", "errandboyservices.com"],
            blacklistedRoutes: ["http://example.com/examplebadroute/"],
         },
      }),
      UserIdleModule.forRoot({idle: 600, timeout: 300, ping: 120}),

      // FontAwesomeModule
   ],
   providers: [DataserviceService, { provide: NZ_I18N, useValue: en_US },
      {
         provide: RECAPTCHA_SETTINGS,
         useValue: { siteKey: '6LdQ-joaAAAAAI7vwNwC9GvZ_7K_CIV0j0Ptc0dy' } as RecaptchaSettings,
       },
      
      {
        provide: HTTP_INTERCEPTORS, useClass: TokeninterceptorService, multi:true 
      }],

   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
