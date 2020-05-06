import {Component, Input, OnInit} from '@angular/core';
import {RoleEnum} from "../../common/enums/role.enum";
import {AuthService} from "../../auth/common/services/auth.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../common/services/user.service";
import {UserApiService} from "../common/services/user-api.service";
import UserListModel from "../common/models/user-list.model";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() list: UserListModel;
  public roleEnum = RoleEnum;
  constructor(private authService: AuthService,
              private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              private  userService: UserService,
              private userApiService: UserApiService) { }

  ngOnInit() { }
}
