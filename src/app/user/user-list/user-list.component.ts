import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RoleEnum} from '../../common/enums/role.enum';
import {AuthService} from '../../auth/common/services/auth.service';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../common/services/user.service';
import {UserApiService} from '../common/services/user-api.service';
import UserListModel from '../common/models/user-list.model';
import {FormDataService} from '../../form-data/common/services/form-data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() list: UserListModel;
  @Input() page;
  @Output() updateListItem: EventEmitter<number> = new EventEmitter<number>();
  @Output() itemDeleted: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() loadListPage: EventEmitter<string | number> = new EventEmitter<string | number>();
  @Output() changedPageCount: EventEmitter<number> = new EventEmitter<number>();
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

  ngOnInit() { }

  deleteUser(id: number) {
    this.userApiService.delete(id, this.httpOptions ).subscribe(response => {
      if (response instanceof HttpErrorResponse) {
        return console.log(response.status);
      }
      this.itemDeleted.emit(true);
    });
  }

  updateUser(id: number) {
    this.updateListItem.emit(id);
  }
}
