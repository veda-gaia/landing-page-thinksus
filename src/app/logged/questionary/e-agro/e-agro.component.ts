import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { EsgRatingService } from 'src/app/services/esg-rating.service';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-e-agro',
  templateUrl: './e-agro.component.html',
  styleUrls: ['./e-agro.component.scss']
})
export class EAgroComponent {
  actualStep = 1
  undefinedAnswers = 0
  keepReading = false
  
  questionaryData = [
    {
      documentNeeded: true,
      id: 'E1'
    },
    {
      documentNeeded: true,
      id: 'E2'
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
    private CompanyService: CompanyService,
    private toastr: ToastrService
  ) {
    this.CompanyService.getByUser().subscribe({
      next: (data) => {
        if(data.section !== 'Agribusiness') {
                    this.toastr.error('Esta avaliação não corresponde ao setor da sua empresa', 'Erro', {progressBar: true});
          this.router.navigate(['/logged/dashboard'])
        }
      },
      error: (err) => {
        console.log(err)
      }
    })

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
    // Preenche o dto com o formArray
    const dto: any = {
      answers: this.formArray.controls.map((control, index) => {
        if(control.value) {{
          return {
            esgNumber: this.questionaryData[index].id,
            answer: control.value,
          }
        }}
        else return false
      })
    }
    
    // Filtra as que tem resposta 
    dto.answers = dto.answers.filter((item: any) => {
      if(!item) return false
      else return true
    })
    
    this.esgRatingService.register(dto).subscribe({
      next: (data) => {
        this.router.navigate(['/logged/assesment'])
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
