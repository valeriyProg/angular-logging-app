import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthApiService} from './common/services/auth-api.service';
import {AuthService} from './common/services/auth.service';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthApiService,
    AuthService
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
