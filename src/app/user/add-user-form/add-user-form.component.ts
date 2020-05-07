import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthApiService} from '../../auth/common/services/auth-api.service';
import {AuthService} from '../../auth/common/services/auth.service';
import {FormDataService} from '../../form-data/common/services/form-data.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RoleEnum} from '../../common/enums/role.enum';
import {UserApiService} from '../common/services/user-api.service';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import FormControlValidator from '../../common/services/form-control.validator';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})
export class AddUserFormComponent implements OnInit {
  @Output() updateList: EventEmitter<boolean> = new EventEmitter<boolean>();
  private addUserForm: FormGroup;
  roleEnum = RoleEnum;
  invalidForm = false;
  constructor(private router: Router,
              private fb: FormBuilder,
              private controlValidator: FormControlValidator,
              private authApiService: AuthApiService,
              private authService: AuthService,
              private http: HttpClient,
              private userApiService: UserApiService,
              private formDataService: FormDataService,
              private modalService: NgbModal) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.loggedUser.token}`
    }),
  };

  ngOnInit() {
    this.initForm();
  }

  showErrorMessage() {
    this.invalidForm = true;
    setTimeout(() => {
      this.invalidForm = false;
    }, 2000);
  }

  private initForm() {
    this.addUserForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: this.roleEnum.admin
    });
  }

  submit(e: Event, modal: any) {
    if (!this.addUserForm.valid) {
      this.showErrorMessage();
      return;
    }

    modal.close('Save click');
    this.addUserForm.patchValue({ role: this.addUserForm.get('role').value.toLowerCase()});

    this.userApiService.post(this.addUserForm.value, this.httpOptions).subscribe(response => {
      if (response instanceof HttpErrorResponse) {
        return console.log(response.status);
      }
      this.updateList.emit(true);
      this.initForm();
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
}
