import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import AuthModel from '../../auth/common/models/auth.model';
import UserModel from '../../user/common/models/user.model';

export default abstract class RestApiAbstract<ElementType> {
  protected abstract readonly http: HttpClient;
  private readonly prefix = 'http://dev.angulartest.digital-era.ru/api';
  protected abstract readonly path: string;

  get(id: string): Observable<ElementType> {
    return this.http.get<ElementType>(`${this.prefix}/${this.path}/${id}`);
  }

  getList(): Observable<ElementType[]> {
    return this.http.get<ElementType[]>(`${this.prefix}/${this.path}`);
  }

  post(data: AuthModel): Observable<ElementType> {
    return this.http.post<ElementType>(`${this.prefix}/${this.path}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.prefix}/${this.path}/${id}`);
  }

  update(id: string, data: UserModel) {
    return this.http.put(`${this.prefix}/${this.path}/${id}`, data );
  }
}
