import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../common/services/auth.service';
import {FormDataService} from '../../form-data/common/services/form-data.service';
import {HttpErrorResponse} from '@angular/common/http';
import LoggedInModel from '../common/models/logged-in.model';
import {AuthApiService} from '../common/services/auth-api.service';
import FormControlValidator from '../../common/services/form-control.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  private registrationForm: FormGroup;
  private invalidForm = false;
  constructor(private router: Router,
              private fb: FormBuilder,
              private controlValidator: FormControlValidator,
              private authApiService: AuthApiService,
              private authService: AuthService,
              private formDataService: FormDataService) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: 'admin'
    });
  }

  showErrorMessage() {
    this.invalidForm = true;
    setTimeout(() => {
      this.invalidForm = false;
    }, 2000);
  }

  registration() {
    const signData = this.formDataService.formGroupToFormData(this.registrationForm);
    this.authApiService.registration(signData).subscribe(response => {
      if (response instanceof HttpErrorResponse) {
        return console.log(response.status);
      }
      this.authService.loggedUser = response as LoggedInModel;
      this.router.navigate(['/users-list' ], { queryParams: { perPage: 5 }});
    });
  }

  submit() {
    if (!this.registrationForm.valid) {
      this.showErrorMessage();
      return;
    }

    this.registration();
  }
}
