import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginInterface } from 'src/app/interfaces/authentication/authentication.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup
  showPassword = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private toastr: ToastrService,
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.scrollToTop()
  }

  onSubmit() {
    if(this.form.invalid) return

    const dto: LoginInterface = {
      email: this.form.controls['email'].value ? this.form.controls['email'].value : '',
      password: this.form.controls['password'].value ? this.form.controls['password'].value : ''
    }

    this.authService.login(dto).subscribe({
      next: (data) => {
        this.authService.setAuthUser(data);
        this.router.navigate(['/logged'])
      },
      error: (err) => {
        this.toastr.error('Credenciais inválidas', 'Erro', {progressBar: true});
      }
    })
  }
  
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
