import { Injectable } from '@angular/core';
import UserModel from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedUser: UserModel;
  constructor() { }
}
