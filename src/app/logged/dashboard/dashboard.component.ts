import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { EsgRatingService } from 'src/app/services/esg-rating.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  avaliationStatus = ''
  userName = ''

  environmentalQuestions = 0
  socialQuestions = 0
  governanceQuestions = 0

  environmentalInfo = {
    progress: 0,
    score: 0,
  }
  socialInfo = {
    progress: 0,
    score: 0,
  }
  governanceInfo = {
    progress: 0,
    score: 0,
  }

  constructor(
    private EsgRatingService: EsgRatingService,
    private CompanyService: CompanyService,
  ) {
    this.avaliationStatus = 'pre-avaliation'

    this.CompanyService.getByUser().subscribe({
      next: (data) => {
        console.log(data)
        this.userName = data.user.name
        
        if(data.section === 'Agribusiness') {
          this.environmentalQuestions = 13
          this.socialQuestions = 15
          this.governanceQuestions = 14
        }

        if(data.section === 'Industry') {
          this.environmentalQuestions = 12
          this.socialQuestions = 15
          this.governanceQuestions = 14
        }

        if(data.section === 'Services') {
          this.environmentalQuestions = 13
          this.socialQuestions = 15
          this.governanceQuestions = 14
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
        console.log(data)
        let list = data.filter(item => {
          return item.company._id === companyId
        })
        
        const environmental = list.find((i: any) => {
          return i.answers[0].questionNumber.startsWith("E")
        })
        
        const social = list.find((i: any) => {
          return i.answers[0].questionNumber.startsWith("S")
        })
        
        const governance = list.find((i: any) => {
          return i.answers[0].questionNumber.startsWith("G")
        })

        if(environmental) {
          this.environmentalInfo = {
            progress: environmental.answers.length,
            score: environmental.environmentalScore
          }
        }
        
        if(social) {
          this.environmentalInfo = {
            progress: social.answers.length,
            score: social.socialScore
          }
        }
        
        if(governance) {
          this.environmentalInfo = {
            progress: governance.answers.length,
            score: governance.governanceScore
          }
        }

        // if(!data.length) {
        //   this.avaliationStatus = 'pre-avaliation'
        //   return
        // }
        // this.avaliationStatus = 'post-avaliation'
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  toggleAvaliationStatus() {
    if(this.avaliationStatus === 'pre-avaliation') {
      this.avaliationStatus = 'post-avaliation'
    } else this.avaliationStatus = 'pre-avaliation'
  }
}
