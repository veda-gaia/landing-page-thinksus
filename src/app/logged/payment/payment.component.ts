import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  form: FormGroup
  addressForm: FormGroup
  paymentMethod = 'credit'
  selectedAddress = 'same'
  plan = 'simulation'

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.form = this.fb.group({
      cardNumber: [''],
      name: [''],
      deadLine: [''],
      securityCode: [''],
      address: [''],
      postalCode: [''],
      city: [''],
      state: [''],
      country: [''],
    })

    this.addressForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
    })
  }

  onSubmit() {
    if(this.invalidPaymentForm || this.invalidAnotherAddress) return

    this.router.navigate(['/logged/assesment'])
  }

  changeSelectedAddress(address: string) {
    this.selectedAddress = address
  }

  changeSelectedPlan(plan: string) {
    this.plan = plan
  }

  get invalidPaymentForm(): boolean {
    if(
      this.paymentMethod === 'credit'
      &&
      (
        !this.form.controls['cardNumber'].value ||
        !this.form.controls['name'].value ||
        !this.form.controls['deadLine'].value ||
        !this.form.controls['securityCode'].value ||
        !this.form.controls['address'].value ||
        !this.form.controls['postalCode'].value ||
        !this.form.controls['city'].value ||
        !this.form.controls['state'].value ||
        !this.form.controls['country'].value
      )
    ) return true
    else return false
  }

  get invalidAnotherAddress(): boolean {
    if(
      this.selectedAddress === 'another'
      &&
      this.addressForm.invalid
    ) return true
    else return false
  }
}
