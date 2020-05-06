import { Injectable } from '@angular/core';
import LoggedInModel from '../models/logged-in.model';

@Injectable()
export class AuthService {
  public loggedUser: LoggedInModel;
}
