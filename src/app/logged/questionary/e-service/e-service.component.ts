import { Component } from '@angular/core';
import { FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { EsgRatingService } from 'src/app/services/esg-rating.service';

@Component({
  selector: 'app-e-service',
  templateUrl: './e-service.component.html',
  styleUrls: ['./e-service.component.scss']
})
export class EServiceComponent {
  actualStep = 1
  undefinedAnswers = 0
  keepReading = false
  
  questionaryData = [
    {
      documentNeeded: true,
      id: 'E3'
    },
    {
      documentNeeded: true,
      id: 'E4'
    },
    {
      documentNeeded: true,
      id: 'E5'
    },
    {
      documentNeeded: true,
      id: 'E6'
    },
    {
      documentNeeded: true,
      id: 'E7'
    },
    {
      documentNeeded: true,
      id: 'E8'
    },
    {
      documentNeeded: true,
      id: 'E9'
    },
    {
      documentNeeded: true,
      id: 'E10'
    },
    {
      documentNeeded: true,
      id: 'E11'
    },
    {
      documentNeeded: true,
      id: 'E12'
    },
    {
      documentNeeded: true,
      id: 'E13'
    },
    {
      documentNeeded: true,
      id: 'E14'
    },
    {
      documentNeeded: true,
      id: 'E15'
    },
  ]

  formArray: FormArray<FormControl<any>>
  formArrayDocuments: FormArray<FormControl<any>>

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private esgRatingService: EsgRatingService,
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
      if(this.questionaryData[index].documentNeeded && control.value === 'Yes') {
        this.formArrayDocuments.push(new FormControl('', Validators.required))
      } else {
        this.formArrayDocuments.push(new FormControl(''))
      }
    })
    
    this.actualStep = this.actualStep + 1
  }

  submitDocuments() {
    // if(this.formArrayDocuments.invalid) return

    this.finish()
  }

  finish() {
    // Abre o modal de enviar formulário
    const modalRef = this.modalService.open(ConfirmModalComponent, {centered: true});

    // Se inscreve na resposta do usuário
    modalRef.componentInstance.accepted.subscribe((closed: boolean) => {
      if (closed) {
        // Enviar forms para o backend
        const dto = {
          answers: this.formArray.controls.map((control, index) => {
            return {
              esgNumber: this.questionaryData[index].id,
              answer: control.value,
            }
          })
        }

        this.esgRatingService.register(dto).subscribe({
          next: (data) => {
            this.router.navigate(['/logged/assesment'])
          },
          error: (err) => {
            console.log(err)
          }
        })

      }
    });
  }

  stepBack() {
    this.actualStep = this.actualStep - 1
    this.keepReading = false
  }

  checkDoesntApply() {
    this.undefinedAnswers = this.formArray.controls.reduce((acc: number, cur: FormControl) => {
      if(cur.value === 'Not apply') {
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
