import { Injectable } from '@angular/core';
import UserListModel from '../models/user-list.model';

@Injectable()
export class UserService {
  public userList: UserListModel;
  constructor() { }
}
