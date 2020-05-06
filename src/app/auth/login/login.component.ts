import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthApiService} from '../common/services/auth-api.service';
import {AuthService} from '../common/services/auth.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import LoggedInModel from '../common/models/logged-in.model';
import {FormDataService} from '../../form-data/common/services/form-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  constructor(private router: Router,
              private fb: FormBuilder,
              private authApiService: AuthApiService,
              private authService: AuthService,
              private formDataService: FormDataService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    });
  }

  submit() {
    const loginData = this.formDataService.formGroupToFormData(this.loginForm);
    this.authApiService.post(loginData).subscribe(response => {
      if (response instanceof HttpErrorResponse) {
        return console.log(response.status);
      }
      this.authService.loggedUser = response as LoggedInModel;
      this.router.navigate(['/users-list']);
    });
  }
}
