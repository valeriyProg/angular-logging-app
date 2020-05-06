import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import UserModel from '../common/models/user.model';
import LoggedInModel from '../../auth/common/models/logged-in.model';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnInit {
  @Input() userData: UserModel | LoggedInModel;
  @Output() userClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

}
