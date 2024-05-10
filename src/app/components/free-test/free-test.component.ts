import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-free-test',
  templateUrl: './free-test.component.html',
  styleUrls: ['./free-test.component.scss']
})
export class FreeTestComponent {
  actualStep = 1
  keepReading = false
  score = 0
  
  form1: FormGroup
  form2: FormGroup
  form3: FormGroup
  form4: FormGroup
  form5: FormGroup
  form6: FormGroup
  form7: FormGroup
  form8: FormGroup
  form9: FormGroup
  form10: FormGroup
  form11: FormGroup
  form12: FormGroup
  form13: FormGroup

  constructor(
    private fb: FormBuilder
  ) {
    this.form1 = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
      companyName: ['', Validators.required],
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

    this.form5 = this.fb.group({
      answer: ['', Validators.required],
    })

    this.form6 = this.fb.group({
      answer: ['', Validators.required],
    })

    this.form7 = this.fb.group({
      answer: ['', Validators.required],
    })

    this.form8 = this.fb.group({
      answer: ['', Validators.required],
    })

    this.form9 = this.fb.group({
      answer: ['', Validators.required],
    })

    this.form10 = this.fb.group({
      answer: ['', Validators.required],
    })

    this.form11 = this.fb.group({
      answer: ['', Validators.required],
    })

    this.form12 = this.fb.group({
      answer: ['', Validators.required],
    })

    this.form13 = this.fb.group({
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

  onSubmitStep5() {
    if(this.form5.invalid) return

    this.actualStep = 6
    this.keepReading = false
  }

  onSubmitStep6() {
    if(this.form6.invalid) return

    this.actualStep = 7
    this.keepReading = false
  }

  onSubmitStep7() {
    if(this.form7.invalid) return

    this.actualStep = 8
    this.keepReading = false
  }

  onSubmitStep8() {
    if(this.form8.invalid) return

    this.actualStep = 9
    this.keepReading = false
  }

  onSubmitStep9() {
    if(this.form9.invalid) return

    this.actualStep = 10
    this.keepReading = false
  }

  onSubmitStep10() {
    if(this.form10.invalid) return

    this.actualStep = 11
    this.keepReading = false
  }

  onSubmitStep11() {
    if(this.form11.invalid) return

    this.actualStep = 12
    this.keepReading = false
  }

  onSubmitStep12() {
    if(this.form12.invalid) return

    this.actualStep = 13
    this.keepReading = false
  }

  finish() {
    if(
      this.form1.invalid
      || this.form2.invalid
      || this.form3.invalid
      || this.form4.invalid
      || this.form5.invalid
      || this.form6.invalid
      || this.form7.invalid
      || this.form8.invalid
      || this.form9.invalid
      || this.form10.invalid
      || this.form11.invalid
      || this.form12.invalid
      || this.form13.invalid
    ) return

    const yesAnswers = [
      this.form2.controls['answer'].value,
      this.form3.controls['answer'].value,
      this.form4.controls['answer'].value,
      this.form5.controls['answer'].value,
      this.form6.controls['answer'].value,
      this.form7.controls['answer'].value,
      this.form8.controls['answer'].value,
      this.form9.controls['answer'].value,
      this.form10.controls['answer'].value,
      this.form11.controls['answer'].value,
      this.form13.controls['answer'].value,
    ]

    yesAnswers.forEach(i => {
      if(i === 'yes') this.score = this.score + 8.333
    })

    if(this.form13.controls['answer'].value === 'no') {
      this.score = this.score + 8.333
    }

    this.score = (this.score / 12) * 10
    this.score = Math.round(this.score)

    this.actualStep = 14
  }

  stepBack() {
    this.actualStep = this.actualStep - 1
    this.keepReading = false
  }
}
