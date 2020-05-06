import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../common/services/auth.service';
import {FormDataService} from '../../form-data/common/services/form-data.service';
import {HttpErrorResponse} from '@angular/common/http';
import LoggedInModel from '../common/models/logged-in.model';
import {AuthApiService} from '../common/services/auth-api.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  private registrationForm: FormGroup;
  constructor(private router: Router,
              private fb: FormBuilder,
              private authApiService: AuthApiService,
              private authService: AuthService,
              private formDataService: FormDataService) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      name: '',
      email: '',
      password: ''
    });
  }

  submit() {
    const signData = this.formDataService.formGroupToFormData(this.registrationForm);
    this.authApiService.registration(signData).subscribe(response => {
      if (response instanceof HttpErrorResponse) {
        return console.log(response.status);
      }
      this.authService.loggedUser = response as LoggedInModel;
      this.router.navigate(['/users-list' ], { queryParams: { perPage: -1 }});
    });
  }
}
