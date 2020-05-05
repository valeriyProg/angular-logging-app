import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AuthApiService} from '../common/services/auth-api.service';
import {AuthService} from '../common/services/auth.service';
import {UserService} from '../../user/common/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  constructor(private fb: FormBuilder,
              private authApiService: AuthApiService,
              private authService: AuthService,
              private userService: UserService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      login: '',
      password: new FormControl('')
    });
  }

  submit() {
    this.authApiService.post({
      email: 'user@user.com',
      password: 'user'
    }).subscribe(response => {
      this.userService.loggedUser = response;
      console.log(this.userService.loggedUser);
    });
  }
}
