import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthApiService} from '../common/services/auth-api.service';
import {AuthService} from '../common/services/auth.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import LoggedInModel from '../common/models/logged-in.model';
import {FormDataService} from '../../form-data/common/services/form-data.service';
import FormControlValidator from '../../common/services/form-control.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private userNotFoundError = false;
  private invalidForm = false;
  constructor(private router: Router,
              private fb: FormBuilder,
              private controlValidator: FormControlValidator,
              private authApiService: AuthApiService,
              private authService: AuthService,
              private formDataService: FormDataService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  showErrorMessage() {
    this.invalidForm = true;
    setTimeout(() => {
      this.invalidForm = false;
    }, 2000);
  }

  login() {
    const loginData = this.formDataService.formGroupToFormData(this.loginForm);
    this.authApiService.login(loginData).subscribe(response => {
      if (response instanceof HttpErrorResponse) {
        this.userNotFoundError = true;
        return console.log(response.status);
      }
      this.authService.loggedUser = response as LoggedInModel;
      this.router.navigate(['/users-list' ], { queryParams: { perPage: -1 }});
    });
  }

  submit() {
    const isInvalidFormControls = {
      email: this.controlValidator.isControlInvalid('email', this.loginForm),
      password: this.controlValidator.isControlInvalid('password', this.loginForm)
    };

    if (isInvalidFormControls.email || isInvalidFormControls.password) {
      this.showErrorMessage();
      return;
    }

    this.login();
  }
}
