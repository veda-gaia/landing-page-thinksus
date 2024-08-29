import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  emailForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  passwordForm = this.fb.group({
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required, this.passwordValidation.bind(this),]),
    code: new FormControl('', [Validators.required])
  })

  step = 1;
  showPassword = false;
  showPasswordConfirmation = false;

  constructor(
    private fb:FormBuilder, 
    private router:Router, 
    private userService:UserService, 
    private toastr:ToastrService,
    private translateService: TranslateService,
    private spinnerService: NgxSpinnerService
  ) { }


  passwordValidation(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (
      this.passwordForm?.controls?.password &&
      control.value !== this.passwordForm.controls.password.value
    ) {
      return { passwordConfirmation: true };
    }
    return null;
  }

  sendEmail() {
    if(this.emailForm.invalid || !this.emailForm.value.email) {
      this.toastr.error('Please enter a valid email address');
      return;
    }

    const request = {
      email: this.emailForm.value.email,
      lang: this.translateService.currentLang
    }
    this.spinnerService.show();
    this.userService.resetPasswordEmail(request).pipe(
      finalize(() => {
        this.spinnerService.hide()
      })
    ).subscribe({
      next: () => {
        this.toastr.success('Email sent successfully');
        this.step = 2;
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('An error occurred');
      }
    })
  }

  sendPassword() {
    if(this.passwordForm.invalid) {
      this.toastr.error('Please fill all fields');
      return;
    }

    const dto = {
      email: this.emailForm.value.email!,
      password: this.passwordForm.value.password!,
      code: this.passwordForm.value.code!
    }
    this.spinnerService.show()

    this.userService.resetPassword(dto).pipe(
      finalize(() => {
        this.spinnerService.hide()
      })
    ).subscribe({
      next: () => {
        this.toastr.success('Password changed successfully');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('An error occurred');
      }
    });
  }
}
