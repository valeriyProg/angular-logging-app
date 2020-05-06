import { Injectable } from '@angular/core';
import RestApiAbstract from '../../../common/contracts/rest-api.abstract';
import UserModel from '../models/user.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserApiService extends RestApiAbstract<UserModel> {
  protected readonly path = 'user';

  constructor(protected readonly http: HttpClient) {
    super();
  }
}
