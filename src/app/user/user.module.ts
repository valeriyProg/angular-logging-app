import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import {UserApiService} from './common/services/user-api.service';
import {UserService} from './common/services/user.service';
import { AddUserFormComponent } from './add-user-form/add-user-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbButtonsModule, NgbDatepickerModule, NgbModal, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import { EditFormComponent } from './edit-form/edit-form.component';

@NgModule({
  declarations: [
    UserListComponent,
    AddUserFormComponent,
    UserAvatarComponent,
    EditFormComponent,
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
    FormsModule,
    NgbPaginationModule
  ],
  exports: [
    AddUserFormComponent,
    UserListComponent,
    UserAvatarComponent,
    EditFormComponent
  ]
})
export class UserModule { }
