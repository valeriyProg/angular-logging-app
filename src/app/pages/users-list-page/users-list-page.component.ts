import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/common/services/auth.service';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../user/common/services/user.service';
import UserListModel from '../../user/common/models/user-list.model';
import {UserApiService} from '../../user/common/services/user-api.service';
import {RoleEnum} from '../../common/enums/role.enum';

@Component({
  selector: 'app-users-list-page',
  templateUrl: './users-list-page.component.html',
  styleUrls: ['./users-list-page.component.scss']
})
export class UsersListPageComponent implements OnInit {
  public roleEnum = RoleEnum;
  constructor(private authService: AuthService,
              private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              private  userService: UserService,
              private userApiService: UserApiService) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.loggedUser.token}`
    }),
    params: this.activatedRoute.snapshot.queryParams
  };

  ngOnInit() {
    this.userApiService.getList(this.httpOptions).subscribe(response => {
      if (response instanceof HttpErrorResponse) {
        return console.log(response.status);
      }
      this.userService.userList = response as UserListModel;
    });
  }

  userAddedHandler(event: boolean) {
    if (event) {
      this.userApiService.getList(this.httpOptions).subscribe(response => {
        if (response instanceof HttpErrorResponse) {
          return console.log(response.status);
        }
        this.userService.userList = response as UserListModel;
      });
    }
  }
}
