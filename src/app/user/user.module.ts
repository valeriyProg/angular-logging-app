import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import {UserApiService} from './common/services/user-api.service';
import {UserService} from './common/services/user.service';


@NgModule({
  declarations: [UserListComponent],
  providers: [
    UserApiService,
    UserService
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
