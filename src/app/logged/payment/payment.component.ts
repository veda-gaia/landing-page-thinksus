import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  form: FormGroup
  paymentMethod = 'credit'
  selectedAddress = 'same'
  plan = 'simulation'

  constructor(
    private fb: FormBuilder
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
  }

  onSubmit() {
    if(this.invalidPaymentForm) return
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
}
