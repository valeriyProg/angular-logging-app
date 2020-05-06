import {Routes} from '@angular/router';
import {LoginPageComponent} from '../pages/login-page/login-page.component';
import {HomePageComponent} from '../pages/home-page/home-page.component';
import {UsersListPageComponent} from '../pages/users-list-page/users-list-page.component';
import {LoginGuard} from './guards/login.guard';

export const routes: Routes  = [
  { path: '', component: HomePageComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'users-list', component: UsersListPageComponent, canActivate: [LoginGuard]}
];
