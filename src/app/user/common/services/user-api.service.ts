import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {obj} from '../../../common/types';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import UserListModel from '../models/user-list.model';
import LoggedInModel from '../../../auth/common/models/logged-in.model';
import UserModel from '../models/user.model';
import UserCreateModel from '../../../auth/common/models/user-create.model';

@Injectable()
export class UserApiService {
  private readonly prefix = 'http://dev.angulartest.digital-era.ru/api';
  private readonly path: string = 'user';
  constructor(private readonly http: HttpClient) { }

  get(id: string, options: obj): Observable<UserModel | HttpErrorResponse> {
    return this.http.get<UserModel>(`${this.prefix}/${this.path}/${id}`, options)
      .pipe(catchError(this.handleError));
  }

  getList(options: obj): Observable<UserListModel | HttpErrorResponse> {
    return this.http.get<UserListModel | HttpErrorResponse>(`${this.prefix}/${this.path}`, options)
      .pipe(catchError(this.handleError));
  }

  post(data: FormData | obj, options?: obj ): Observable<LoggedInModel | HttpErrorResponse> {
    return this.http.post<LoggedInModel | HttpErrorResponse>(`${this.prefix}/${this.path}`, data, options)
      .pipe(catchError(this.handleError));
  }

  delete(id: string | number, options: obj): Observable<void | HttpErrorResponse> {
    return this.http.delete<void>(`${this.prefix}/${this.path}/${id}`, options)
      .pipe(catchError(this.handleError));
  }

  update(id: string | number, data: UserCreateModel, options: obj): Observable<void | HttpErrorResponse>  {
    return this.http.put<void>(`${this.prefix}/${this.path}/${id}`, data, options)
      .pipe(catchError(this.handleError));
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
