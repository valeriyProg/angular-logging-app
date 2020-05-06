import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import {UserApiService} from './common/services/user-api.service';
import {UserService} from './common/services/user.service';
import { AddUserFormComponent } from './add-user-form/add-user-form.component';


@NgModule({
  declarations: [
    UserListComponent,
    AddUserFormComponent
  ],
  providers: [
    UserApiService,
    UserService
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AddUserFormComponent
  ]
})
export class UserModule { }
