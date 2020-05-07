import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export default class FormControlValidator {
  constructor() {}

  isControlInvalid(controlName: string, form: FormGroup): boolean {
    const control = form.controls[controlName];
    return control.invalid;
  }
}
