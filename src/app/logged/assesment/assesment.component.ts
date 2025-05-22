import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { updateStatusDto } from 'src/app/dtos/update-status.dto';
import { CompanyService } from 'src/app/services/company.service';
import { ContractedPlanService } from 'src/app/services/contracted-plan.service';
import { EsgRatingService } from 'src/app/services/esg-rating.service';
import { ScoreWarningComponent } from '../score-warning/score-warning.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-assesment',
  templateUrl: './assesment.component.html',
  styleUrls: ['./assesment.component.scss']
})
export class AssesmentComponent {
  @ViewChild('contentModal') contentModal: any;

  form: FormGroup

  companySection = 'agro'
  loading = true

  environmentalQuestions = 0
  socialQuestions = 0
  governanceQuestions = 0

  environmentalProgress = 0
  socialProgress = 0
  governanceProgress = 0

  assesmentId = ''
  userHasContractedPlan = false

  constructor(
    private fb: FormBuilder,
    private EsgRatingService: EsgRatingService,
    private CompanyService: CompanyService,
    private toastr: ToastrService,
    private router: Router,
    private contractedPlanService: ContractedPlanService,
    private modalService: NgbModal,
    private translateService: TranslateService,
    private spinnerService: NgxSpinnerService
  ) {

    this.form = this.fb.group({
      title: ['', Validators.required]
    })
    this.spinnerService.show()

    this.CompanyService.getByUser().pipe(
      finalize(() => {
        this.spinnerService.hide()
      })
    ).subscribe({
      next: (data) => {
        if(data.section === 'Agribusiness') {
          this.environmentalQuestions = 13
          this.socialQuestions = 15
          this.governanceQuestions = 14

          this.companySection = 'agro'
        }

        if(data.section === 'Industry') {
          this.environmentalQuestions = 12
          this.socialQuestions = 15
          this.governanceQuestions = 14

          this.companySection = 'industry'
        }

        if(data.section === 'Services') {
          this.environmentalQuestions = 13
          this.socialQuestions = 15
          this.governanceQuestions = 14

          this.companySection = 'service'
        }
        
        this.handleInfo(data._id, data.section)
      },
      error: (err) => {
        console.log(err)
      }
    })

    this.contractedPlanService.checkContractedPlanByUser().subscribe({
      next: (data: boolean) => {
        this.userHasContractedPlan = data
      }
    })
  }

  handleInfo(companyId: string, section: string) {
    this.spinnerService.show()
    this.EsgRatingService.list().pipe(
      finalize(() => {
        this.spinnerService.hide()
      })
    ).subscribe({
      next: (data) => {
        // Pega o item que pertence a minha empresa
        let myCompanyInfo = data.filter(item => {
          return item?.company?._id === companyId && item?.status === "IN_PROGRESS"
        })[0]
        
        console.log(data)

        if(myCompanyInfo) {
          const environmentalAnswers = myCompanyInfo.answers.filter((i: any) => {
            return i.questionNumber.startsWith("E")
          })
          
          const socialAnswers = myCompanyInfo.answers.filter((i: any) => {
            return i.questionNumber.startsWith("S")
          })
          
          const governanceAnswers = myCompanyInfo.answers.filter((i: any) => {
            return i.questionNumber.startsWith("G")
          })

          if(environmentalAnswers.length) {
            this.environmentalProgress = +((environmentalAnswers.length / this.environmentalQuestions) * 100).toFixed(0)
          }
          
          if(socialAnswers.length) {
            this.socialProgress = +((socialAnswers.length / this.socialQuestions) * 100).toFixed(0)
          }
          
          if(governanceAnswers.length) {
            this.governanceProgress = +((governanceAnswers.length / this.governanceQuestions) * 100).toFixed(0)
          }

          this.assesmentId = myCompanyInfo._id
        }

        this.loading = false
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  onSubmit() {
    if(this.form.invalid || !this.assesmentId.length) return

    const dto: updateStatusDto = {
      status: 'COMPLETED',
      lang: this.translateService.currentLang
    }
    const titleDto: any = {
      title: this.form.controls['title'].value
    }
    this.spinnerService.show()

    this.EsgRatingService.updateStatusById(this.assesmentId, dto).pipe(
      finalize(() => {
        this.spinnerService.hide()
      })
    ).subscribe({
      next: (data) => {
        setTimeout(() => {
          this.EsgRatingService.updateTitleById(this.assesmentId, titleDto).subscribe({
            next: (data) => {
              this.toastr.success('Pontuação gerada com sucesso', 'Sucesso', {progressBar: true});
      
                this.router.navigate(['/logged/results'])
              }
          })
        }, 100)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  navigateToSimulation() {
    this.router.navigate(['simulation']);
  }

  verifyPossibility(symbol: string) {
    this.spinnerService.show()

    this.contractedPlanService.getByUser().pipe(
      finalize(() => {
        this.spinnerService.hide()
      })
    ).subscribe({
      next: data => {
        if(!data.verify) {
          this.modalService.open(ScoreWarningComponent, {centered: true, size: 'sm'})
        } else {
          this.router.navigate(['/logged/assesment/' + symbol + '-' + this.companySection])
        }
      },
      error: error => {
        if(error.error.errors.includes('Contrate um plano')) {
          this.toastr.warning('Contrate um plano antes de iniciar avaliação!', 'Atenção', {progressBar: true})
          this.router.navigate(['/logged/plans'])
        }
      }
    })
  }

  close() {
    this.modalService.dismissAll();
  }

  getSymbolCompanySection() {


  }

}
