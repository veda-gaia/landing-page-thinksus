import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-g-agro',
  templateUrl: './g-agro.component.html',
  styleUrls: ['./g-agro.component.scss']
})
export class GAgroComponent implements OnInit {
  actualStep = 1
  undefinedAnswers = 0
  keepReading = false
  
  questionaryData = [
    {
      question: 'Empresa possui Compliance Interno de Função Social?',
      description: 'Compliance interno de função social são regras e orientações de responsabilidade individual e coletiva da empresa que contemplam esferas da sociedade, como criação de empregos, pagamento de tributos, geração de riqueza, contribuição para o desenvolvimento econômico, social e cultural do entorno, adoção de práticas sustentáveis e respeito aos direitos dos consumidores.',
      documentNeeded: false,
      id: 'S1'
    },
    {
      question: 'Existe Política e práticas de bem estar animal?',
      description: 'Regras e normas que a empresa deve seguir para o bem estar animal',
      documentNeeded: true,
      id: 'S2'
    },
    {
      question: 'Existe Política e práticas de bem estar animal?',
      description: 'Regras e normas que a empresa deve seguir para o bem estar animal',
      documentNeeded: true,
      id: 'S3'
    },
    {
      question: 'Existe Política e práticas de bem estar animal?',
      description: 'Regras e normas que a empresa deve seguir para o bem estar animal',
      documentNeeded: true,
      id: 'S4'
    },
  ]

  formArray: FormArray<FormControl<any>>
  formArrayDocuments: FormArray<FormControl<any>>

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.formArray = this.fb.array([])
    this.formArrayDocuments = this.fb.array([])

    this.questionaryData.forEach((item) => {
      this.formArray.push(new FormControl('', Validators.required))
    })

    this.formArray.valueChanges.subscribe({
      next: () => {
        this.checkDoesntApply()
      }
    })
  }

  ngOnInit() {
    this.scrollToTop()
  }

  onSubmitStep(step: number) {
    if(this.formArray.at(step).invalid) return

    this.actualStep = step + 2
    // this.checkDoesntApply()
  }

  submitRevision() {
    this.formArray.controls.forEach((control, index) => {
      if(this.questionaryData[index].documentNeeded && control.value === 'yes') {
        this.formArrayDocuments.push(new FormControl('', Validators.required))
      } else {
        this.formArrayDocuments.push(new FormControl(''))
      }
    })
    
    this.actualStep = this.actualStep + 1
  }

  submitDocuments() {
    if(this.formArrayDocuments.invalid) return

    this.finish()
  }

  finish() {
    // Abre o modal de enviar formulário
    const modalRef = this.modalService.open(ConfirmModalComponent, {centered: true});

    // Se inscreve na resposta do usuário
    modalRef.componentInstance.accepted.subscribe((closed: boolean) => {
      if (closed) {
        // Enviar forms para o backend
        this.router.navigate(['/logged/assesment'])
      }
    });
  }

  stepBack() {
    this.actualStep = this.actualStep - 1
    this.keepReading = false
  }

  checkDoesntApply() {
    this.undefinedAnswers = this.formArray.controls.reduce((acc: number, cur: FormControl) => {
      if(cur.value === 'undefined') {
        return acc + 1
      } else {
        return acc
      }
    }, 0)

    // console.log(this.undefinedAnswers)
  }

  continueLater() {
    this.router.navigate(['/logged/assesment'])
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
