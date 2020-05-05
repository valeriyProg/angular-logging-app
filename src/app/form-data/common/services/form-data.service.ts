import { Injectable } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  formGroupToFormData(data: FormGroup): FormData {
    return this.objectToFormData(data.value);
  }

  objectToFormData(data: { [key: string]: string | Blob }) {
    const formData = new FormData();

    for (const key in data) {
      if (!data.hasOwnProperty(key) || !data[key]) {
        continue;
      }

      formData.append(key, data[key]);
    }

    return formData;
  }
}
