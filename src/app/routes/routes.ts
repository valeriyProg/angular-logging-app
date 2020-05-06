import {Routes} from '@angular/router';
import {LoginPageComponent} from '../pages/login-page/login-page.component';
import {UsersListPageComponent} from '../pages/users-list-page/users-list-page.component';
import {LoginGuard} from './guards/login.guard';

export const routes: Routes  = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginPageComponent},
  { path: 'users-list', component: UsersListPageComponent, canActivate: [LoginGuard]},
  { path: '**', redirectTo: 'users-list', pathMatch: 'full'}
];
