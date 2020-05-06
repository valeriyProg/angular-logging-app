import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import LoggedInModel from '../models/logged-in.model';
import {obj} from '../../../common/types';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class AuthApiService  {
  private readonly prefix = 'http://dev.angulartest.digital-era.ru/api';
  private readonly  loginPath = 'login';
  private readonly  registrationPath = 'signup';
  constructor(protected readonly http: HttpClient) { }

  private post(data: FormData | obj, path: string, options?: obj,  ): Observable<LoggedInModel | HttpErrorResponse> {
    return this.http.post<LoggedInModel | HttpErrorResponse>(`${this.prefix}/${path}`, data, options)
      .pipe(catchError(this.handleError));
  }

  public login(data: FormData | obj, options?: obj ) {
    return this.post(data, this.loginPath, options);
  }

  public registration(data: FormData | obj, options?: obj ) {
    return this.post(data, this.registrationPath, options);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return of(error);
  }
}
