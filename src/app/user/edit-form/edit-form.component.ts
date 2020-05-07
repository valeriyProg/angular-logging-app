import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoleEnum} from '../../common/enums/role.enum';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {UserApiService} from '../common/services/user-api.service';
import {AuthService} from '../../auth/common/services/auth.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {
  @Input() userId: number;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() updateList: EventEmitter<boolean> = new EventEmitter<boolean>();
  private editForm: FormGroup;
  private roleEnum = RoleEnum;
  private invalidForm: boolean;
  constructor(private fb: FormBuilder,
              private userApiService: UserApiService,
              private authService: AuthService) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.loggedUser.token}`
    }),
  };

  ngOnInit() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: this.roleEnum.admin
    });
  }

  showErrorMessage() {
    this.invalidForm = true;
    setTimeout(() => {
      this.invalidForm = false;
    }, 2000);
  }

  submit() {
    if (!this.editForm.valid) {
      this.showErrorMessage();
      return;
    }

    this.editForm.patchValue({ role: this.editForm.get('role').value.toLowerCase()});

    this.userApiService.update(this.userId, this.editForm.value, this.httpOptions ).subscribe(response => {
      if (response instanceof HttpErrorResponse) {
        return console.log(response.status);
      }
      this.updateList.emit(true);
    });
  }
}
