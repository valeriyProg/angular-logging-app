import {Component, EventEmitter, Input, Output} from '@angular/core';
import UserModel from '../common/models/user.model';
import LoggedInModel from '../../auth/common/models/logged-in.model';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent  {
  @Input() userData: UserModel | LoggedInModel;
  @Output() userClick: EventEmitter<boolean> = new EventEmitter<boolean>();
}
