import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomvalidationService {

  constructor() { }

  matchPassword(newPass: string, confirmPass: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      // const newPass: any = formGroup.get(newPass);

      // borrar: 
      return null;
    }
  }
}
