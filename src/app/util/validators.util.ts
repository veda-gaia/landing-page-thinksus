import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function comparePassword(passwordField: string, confirmPasswordField: string): ValidatorFn {

  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get(passwordField)?.value;
    const confirmPassword = formGroup.get(confirmPasswordField)?.value;

    
    if (password !== confirmPassword) {
      formGroup.get(confirmPasswordField)?.setErrors({ passwordNotExact: true });
      return { passwordNotExact: true };
    }

    if (formGroup.get(confirmPasswordField)?.hasError('passwordNotExact')) {
      formGroup.get(confirmPasswordField)?.setErrors(null);
    }

    return null;
  };
}
