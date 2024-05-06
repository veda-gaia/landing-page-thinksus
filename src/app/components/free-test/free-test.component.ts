import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-free-test',
  templateUrl: './free-test.component.html',
  styleUrls: ['./free-test.component.scss']
})
export class FreeTestComponent {
  actualStep = 5
  keepReading = false
  
  form1: FormGroup
  form2: FormGroup
  form3: FormGroup
  form4: FormGroup

  constructor(
    private fb: FormBuilder
  ) {
    this.form1 = this.fb.group({
      name: ['Mateus Borges', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
      companyName: ['ColabX', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
    })

    this.form2 = this.fb.group({
      answer: ['', Validators.required],
    })

    this.form3 = this.fb.group({
      answer: ['', Validators.required],
    })

    this.form4 = this.fb.group({
      answer: ['', Validators.required],
    })
  }

  onSubmitStep1() {
    if(this.form1.invalid) return

    this.actualStep = 2
  }

  onSubmitStep2() {
    if(this.form2.invalid) return

    this.actualStep = 3
    this.keepReading = false
  }

  onSubmitStep3() {
    if(this.form3.invalid) return

    this.actualStep = 4
    this.keepReading = false
  }

  onSubmitStep4() {
    if(this.form4.invalid) return

    this.actualStep = 5
    this.keepReading = false
  }

  stepBack() {
    this.actualStep = this.actualStep - 1
    this.keepReading = false
  }
}
