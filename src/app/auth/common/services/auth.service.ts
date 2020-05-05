import { Injectable } from '@angular/core';
import LoggedInModel from '../models/logged-in.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedUser: LoggedInModel;
  constructor() { }
}
