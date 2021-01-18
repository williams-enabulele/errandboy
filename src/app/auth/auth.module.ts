import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';

import { NgxMaskModule, IConfig } from 'ngx-mask'
export let options: Partial<IConfig> | (() => Partial<IConfig>);

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent, ResetPasswordComponent, VerifyOtpComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    NzLayoutModule,
    ReactiveFormsModule,
    NzFormModule
  ]
})
export class AuthModule { }
