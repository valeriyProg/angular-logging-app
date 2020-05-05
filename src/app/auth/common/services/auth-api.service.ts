import { Injectable } from '@angular/core';
import RestApiAbstract from '../../../common/contracts/rest-api.abstract';
import UserModel from '../../../user/common/models/user.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService extends RestApiAbstract<UserModel> {
  protected  readonly  path = 'login';
  constructor(protected readonly http: HttpClient) {
    super();
  }
}
