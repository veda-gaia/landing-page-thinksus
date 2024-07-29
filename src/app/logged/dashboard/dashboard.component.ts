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
  companySection = 'agro'
  loading = true

  graphData: any = []
  graphConfig: any = { 
    displayModeBar: false,
    responsive: true,
    scrollZoom: false,
    staticPlot: true
  }

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

  odsScoreArray: any[] = []

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

        const graphEnvironmental = {
          x: [1, 2, 3, 4],
          y: [64, 79, 80, 78],
          mode: 'lines+markers',
          type: 'scatter',
          name: 'Governança'
        };
        const graphGovernmental = {
          x: [1, 2, 3, 4],
          y: [71, 89, 90, 99],
          mode: 'lines+markers',
          type: 'scatter',
          name: 'Social'
        };
        const graphSocial = {
          x: [1, 2, 3, 4],
          y: [50, 55, 54, 60],
          mode: 'lines+markers',
          type: 'scatter',
          name: 'Ambiental'
        };
    
        this.graphData.push(graphEnvironmental)
        this.graphData.push(graphGovernmental)
        this.graphData.push(graphSocial)
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

        console.log(myCompanyInfo)
        
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
            this.environmentalInfo = {
              progress: environmentalAnswers.length,
              score: myCompanyInfo.environmentalScore.toFixed(0)
            }
          }
          
          if(socialAnswers.length) {
            this.socialInfo = {
              progress: socialAnswers.length,
              score: myCompanyInfo.socialScore.toFixed(0)
            }
          }
          
          if(governanceAnswers.length) {
            this.governanceInfo = {
              progress: governanceAnswers.length,
              score: myCompanyInfo.governanceScore.toFixed(0)
            }
          }

          this.odsScoreArray = myCompanyInfo.odsScore
        }

        this.loading = false
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
