import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { EsgRatingService } from 'src/app/services/esg-rating.service';

@Component({
  selector: 'app-assesment',
  templateUrl: './assesment.component.html',
  styleUrls: ['./assesment.component.scss']
})
export class AssesmentComponent {
  form: FormGroup

  companySection = 'agro'
  loading = true

  environmentalQuestions = 0
  socialQuestions = 0
  governanceQuestions = 0

  environmentalProgress = 0
  socialProgress = 0
  governanceProgress = 0

  constructor(
    private fb: FormBuilder,
    private EsgRatingService: EsgRatingService,
    private CompanyService: CompanyService,
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required]
    })

    this.CompanyService.getByUser().subscribe({
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
  }

  handleInfo(companyId: string, section: string) {
    this.EsgRatingService.list().subscribe({
      next: (data) => {
        // Pega o item que pertence a minha empresa
        let myCompanyInfo = data.filter(item => {
          return item.company._id === companyId
        })[0]
        
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
        }

        this.loading = false
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  onSubmit() {
    if(this.form.invalid) return
  }
}
