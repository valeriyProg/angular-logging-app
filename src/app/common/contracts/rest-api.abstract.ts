import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import UserModel from '../../user/common/models/user.model';
import {catchError} from 'rxjs/operators';

export default abstract class RestApiAbstract<ElementType> {
  protected abstract readonly http: HttpClient;
  private readonly prefix = 'http://dev.angulartest.digital-era.ru/api';
  protected abstract readonly path: string;

  get(id: string): Observable<ElementType | HttpErrorResponse> {
    return this.http.get<ElementType>(`${this.prefix}/${this.path}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getList(): Observable<ElementType[] | HttpErrorResponse> {
    return this.http.get<ElementType[]>(`${this.prefix}/${this.path}`)
      .pipe(catchError(this.handleError));
  }

  post(data: FormData): Observable<ElementType | HttpErrorResponse> {
    return this.http.post<ElementType | HttpErrorResponse>(`${this.prefix}/${this.path}`, data)
      .pipe(catchError(this.handleError));
  }

  delete(id: string): Observable<void | HttpErrorResponse> {
    return this.http.delete<void>(`${this.prefix}/${this.path}/${id}`)
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
