import { Injectable } from '@angular/core';
import RestApiAbstract from '../../../common/contracts/rest-api.abstract';
import {HttpClient} from '@angular/common/http';
import LoggedInModel from '../models/logged-in.model';

@Injectable()
export class AuthApiService extends RestApiAbstract<LoggedInModel> {
  protected  readonly  path = 'login';
  constructor(protected readonly http: HttpClient) {
    super();
  }
}
