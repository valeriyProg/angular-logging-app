import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import UserModel from '../../user/common/models/user.model';
import {catchError} from 'rxjs/operators';
import {obj} from '../types';
import UserListModel from '../../user/common/models/user-list.model';

export default abstract class RestApiAbstract<ElementType> {
  protected abstract readonly http: HttpClient;
  private readonly prefix = 'http://dev.angulartest.digital-era.ru/api';
  protected abstract readonly path: string;

  get(id: string, options: obj): Observable<ElementType | HttpErrorResponse> {
    return this.http.get<ElementType>(`${this.prefix}/${this.path}/${id}`, options)
      .pipe(catchError(this.handleError));
  }

  getList(options: obj): Observable<UserListModel | HttpErrorResponse> {
    return this.http.get<UserListModel | HttpErrorResponse>(`${this.prefix}/${this.path}`, options)
      .pipe(catchError(this.handleError));
  }

  post(data: FormData): Observable<ElementType | HttpErrorResponse> {
    return this.http.post<ElementType | HttpErrorResponse>(`${this.prefix}/${this.path}`, data)
      .pipe(catchError(this.handleError));
  }

  delete(id: string, options: obj): Observable<void | HttpErrorResponse> {
    return this.http.delete<void>(`${this.prefix}/${this.path}/${id}`, options)
      .pipe(catchError(this.handleError));
  }

  update(id: string, data: UserModel): Observable<void | HttpErrorResponse>  {
    return this.http.put<void>(`${this.prefix}/${this.path}/${id}`, data)
      .pipe(catchError(this.handleError));
  }

  private handleError (error: HttpErrorResponse) {
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
