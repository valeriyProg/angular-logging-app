import { Injectable } from '@angular/core';
import UserListModel from '../models/user-list.model';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class UserService {
  public userList: UserListModel;
  public userListLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }
}
