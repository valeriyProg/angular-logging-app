import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthApiService} from '../../auth/common/services/auth-api.service';
import {AuthService} from '../../auth/common/services/auth.service';
import {FormDataService} from '../../form-data/common/services/form-data.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RoleEnum} from '../../common/enums/role.enum';
import {UserApiService} from '../common/services/user-api.service';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})
export class AddUserFormComponent implements OnInit {
  @Output() updateList: EventEmitter<boolean> = new EventEmitter<boolean>();
  private addUserForm: FormGroup;
  roleEnum = RoleEnum;
  closeResult = '';
  constructor(private router: Router,
              private fb: FormBuilder,
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

  private initForm() {
    this.addUserForm = this.fb.group({
      name: '',
      email: '',
      password: '',
      role: this.roleEnum.admin
    });
  }

  submit(e: Event, modal: any) {
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
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
