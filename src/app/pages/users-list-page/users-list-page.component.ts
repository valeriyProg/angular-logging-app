import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/common/services/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-users-list-page',
  templateUrl: './users-list-page.component.html',
  styleUrls: ['./users-list-page.component.scss']
})
export class UsersListPageComponent implements OnInit {
  constructor(private authService: AuthService, private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      "Authorization": `Bearer ${this.authService.loggedUser.token}`
    })
  };

  ngOnInit() {
    this.http.get('http://dev.angulartest.digital-era.ru/api/user?perPage=2', this.httpOptions).subscribe(result => {
      console.log(result);
    });
  }
}
