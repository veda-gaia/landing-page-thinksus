import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-assesment',
  templateUrl: './assesment.component.html',
  styleUrls: ['./assesment.component.scss']
})
export class AssesmentComponent {
  form: FormGroup

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required]
    })
  }

  onSubmit() {
    if(this.form.invalid) return

    
  }
}
