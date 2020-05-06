import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import {UserApiService} from './common/services/user-api.service';
import {UserService} from './common/services/user.service';
import { AddUserFormComponent } from './add-user-form/add-user-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbButtonsModule, NgbDatepickerModule, NgbModal} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    UserListComponent,
    AddUserFormComponent
  ],
  providers: [
    UserApiService,
    UserService,
    NgbModal
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbButtonsModule,
    FormsModule
  ],
  exports: [
    AddUserFormComponent,
    UserListComponent
  ]
})
export class UserModule { }
