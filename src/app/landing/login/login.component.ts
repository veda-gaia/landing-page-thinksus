import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

    this.router.navigate(['/logged'])
  }
  
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
