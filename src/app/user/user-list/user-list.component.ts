import {
  AfterContentChecked, AfterContentInit,
  AfterViewChecked,
  Component,
  DoCheck,
  EventEmitter,
  Input, OnChanges,
  OnInit,
  Output, SimpleChanges
} from '@angular/core';
import {RoleEnum} from "../../common/enums/role.enum";
import {AuthService} from "../../auth/common/services/auth.service";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../common/services/user.service";
import {UserApiService} from "../common/services/user-api.service";
import UserListModel from "../common/models/user-list.model";
import {FormDataService} from "../../form-data/common/services/form-data.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() list: UserListModel;
  @Input() page;
  @Output() updateList: EventEmitter<boolean | number> = new EventEmitter<boolean | number>();
  public roleEnum = RoleEnum;
  constructor(private authService: AuthService,
              private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              private formDataService: FormDataService,
              private userService: UserService,
              private userApiService: UserApiService) { }

    private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.loggedUser.token}`
    }),
  };

  ngOnInit() {
    // setTimeout(() => {
    //   console.log(this.list);
    // }, 4000);
    // console.log(this.list);
  }

  deleteUser(id: number) {
    this.userApiService.delete(id, this.httpOptions ).subscribe(response => {
      if (response instanceof HttpErrorResponse) {
        return console.log(response.status);
      }
      this.updateList.emit(true);
    });
  }

  updateUser(id: number) {
    this.userApiService.update(id, {
      name: 'New Name!!!',
      email: 'y@y.com!',
      password: 'new',
      role: 'user'
    }, this.httpOptions ).subscribe(response => {
      if (response instanceof HttpErrorResponse) {
        return console.log(response.status);
      }
      this.updateList.emit(true);
    });
  }
}
