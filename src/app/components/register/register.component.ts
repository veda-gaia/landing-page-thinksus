import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { countryList } from 'src/app/util/country';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  actualStep = 1
  keepReading = false
  showPassword = false
  
  form1: FormGroup
  form2: FormGroup
  form3: FormGroup

  countryList = countryList

  constructor(
    private fb: FormBuilder
  ) {
    this.form1 = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
    })

    this.form2 = this.fb.group({
      enterpriseName: ['', Validators.required],
      document: ['', Validators.required],
      country: ['Brasil', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      sector: ['', Validators.required],
      segment: ['', Validators.required],
    })

    this.form3 = this.fb.group({
      collaboratorsAmmount: ['1.000-5.000', Validators.required],
      invoicing: ['above-50.000', Validators.required],
    })
  }

  onSubmitStep1() {
    if(this.form1.invalid) return

    this.actualStep = 2
  }

  onSubmitStep2() {
    if(this.form2.invalid) return

    this.actualStep = 3
  }

  onSubmitStep3() {
    if(this.form3.invalid) return

    this.actualStep = 4
  }

  onSubmitStep4() {
    this.actualStep = 5
  }

  stepBack() {
    this.actualStep = this.actualStep - 1
  }

  get email() {
    return this.form1.controls['email'] as FormControl
  }

  get name() {
    return this.form1.controls['name'] as FormControl
  }
}
