import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-e-agro',
  templateUrl: './e-agro.component.html',
  styleUrls: ['./e-agro.component.scss']
})
export class EAgroComponent {
  actualStep = 1
  undefinedAnswers = 0
  keepReading = false
  
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
      answer: ['', Validators.required],
      question: ['E1', Validators.required],
    })

    this.form2 = this.fb.group({
      answer: ['', Validators.required],
      question: ['E2', Validators.required],
    })

    this.form3 = this.fb.group({
      answer: ['', Validators.required],
      question: ['E4', Validators.required],
    })

    this.form4 = this.fb.group({
      answer: ['', Validators.required],
      question: ['E5', Validators.required],
    })

    this.form5 = this.fb.group({
      answer: ['', Validators.required],
      question: ['E6', Validators.required],
    })

    this.form6 = this.fb.group({
      answer: ['', Validators.required],
      question: ['E7', Validators.required],
    })

    this.form7 = this.fb.group({
      answer: ['', Validators.required],
      question: ['E8', Validators.required],
    })

    this.form8 = this.fb.group({
      answer: ['', Validators.required],
      question: ['E9', Validators.required],
    })

    this.form9 = this.fb.group({
      answer: ['', Validators.required],
      question: ['E10', Validators.required],
    })

    this.form10 = this.fb.group({
      answer: ['', Validators.required],
      question: ['E11', Validators.required],
    })

    this.form11 = this.fb.group({
      answer: ['', Validators.required],
      question: ['E12', Validators.required],
    })

    this.form12 = this.fb.group({
      answer: ['', Validators.required],
      question: ['E14', Validators.required],
    })

    this.form13 = this.fb.group({
      answer: ['', Validators.required],
      question: ['E15', Validators.required],
    })
  }

  onSubmitStep1() {
    if(this.form1.invalid) return

    this.actualStep = 2
    this.checkDoesntApply()
  }

  onSubmitStep2() {
    if(this.form2.invalid) return

    this.actualStep = 3
    this.keepReading = false
    this.checkDoesntApply()
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
    // Abrir modal de enviar formulário
  }

  stepBack() {
    this.actualStep = this.actualStep - 1
    this.keepReading = false
  }

  checkDoesntApply() {
    const formsArray = [
      this.form1.controls['answer'].value,
      this.form2.controls['answer'].value,
      this.form3.controls['answer'].value,
      this.form4.controls['answer'].value,
      this.form5.controls['answer'].value,
      this.form6.controls['answer'].value,
      this.form7.controls['answer'].value,
      this.form8.controls['answer'].value,
      this.form9.controls['answer'].value,
      this.form10.controls['answer'].value,
      this.form12.controls['answer'].value,
      this.form13.controls['answer'].value,
    ]

    this.undefinedAnswers = formsArray.reduce((acc: number, cur: string) => {
      if(cur === 'undefined') {
        return acc + 1
      } else {
        return acc
      }
    }, 0)

    
  }
}
