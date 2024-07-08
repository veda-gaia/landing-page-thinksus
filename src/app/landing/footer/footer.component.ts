import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  form: FormGroup

  constructor(
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      nameMessage: ['', Validators.required],
      emailMessage: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    })
  }

  onSubmit() {
    
  }
}
