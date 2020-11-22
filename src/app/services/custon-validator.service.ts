import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CustonValidatorService {

  constructor() { }

  passwordMatchValidator(userPwd: string, confirmPwd: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[userPwd];
      const confirmPasswordControl = formGroup.controls[confirmPwd];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }
}
