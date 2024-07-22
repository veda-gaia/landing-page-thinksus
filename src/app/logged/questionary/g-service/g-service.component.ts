import { Component } from '@angular/core';
import { FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { EsgRatingService } from 'src/app/services/esg-rating.service';
import { CompanyService } from 'src/app/services/company.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-g-service',
  templateUrl: './g-service.component.html',
  styleUrls: ['./g-service.component.scss']
})
export class GServiceComponent {
  actualStep = 1
  undefinedAnswers = 0
  keepReading = false
  
  questionaryData = [
    {
      documentNeeded: true,
      id: 'G1'
    },
    {
      documentNeeded: true,
      id: 'G2'
    },
    {
      documentNeeded: true,
      id: 'G3'
    },
    {
      documentNeeded: true,
      id: 'G4'
    },
    {
      documentNeeded: true,
      id: 'G5'
    },
    {
      documentNeeded: true,
      id: 'G6'
    },
    {
      documentNeeded: true,
      id: 'G7'
    },
    {
      documentNeeded: true,
      id: 'G8'
    },
    {
      documentNeeded: true,
      id: 'G9'
    },
    {
      documentNeeded: true,
      id: 'G10'
    },
    {
      documentNeeded: true,
      id: 'G11'
    },
    {
      documentNeeded: true,
      id: 'G14'
    },
    {
      documentNeeded: true,
      id: 'G15'
    },
    {
      documentNeeded: true,
      id: 'G16'
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
        if(data.section !== 'Services') {
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
