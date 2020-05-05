import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import {AuthModule} from './auth/auth.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UserModule} from "./user/user.module";
import { UsersListPageComponent } from './pages/users-list-page/users-list-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    UsersListPageComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    UserModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
