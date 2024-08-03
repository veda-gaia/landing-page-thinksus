import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { EsgRatingService } from 'src/app/services/esg-rating.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent {
  form: FormGroup
  loading = true

  openAccordions: number[] = []
  averageResult: any

  odsScoreArray: any[] = [
    {
      ods: "11",
      score: 70.58
    },
    {
      ods: "12",
      score: 72
    },
    {
      ods: "1",
      score: 0
    },
    {
      ods: "8",
      score: 0
    },
    {
      ods: "10",
      score: 0
    },
    {
      ods: "2",
      score: 89
    },
    {
      ods: "13",
      score: 64
    },
    {
      ods: "15",
      score: 86
    },
    {
      ods: "3",
      score: 100
    },
    {
      ods: "7",
      score: 0
    },
    {
      ods: "6",
      score: 55
    },
    {
      ods: "14",
      score: 63.63
    },
  ]
  supplierScoresArray = [
    {
      name: 'Fornecedor #1',
      score: 70
    },
    {
      name: 'Fornecedor #2',
      score: 50
    },
    {
      name: 'Fornecedor #3',
      score: 70
    },
    {
      name: 'Fornecedor #4',
      score: 70
    },
    {
      name: 'Fornecedor #5',
      score: 100
    },
    {
      name: 'Fornecedor #6',
      score: 60
    },
    {
      name: 'Fornecedor #7',
      score: 70
    },
  ]
  
  constructor(
    private EsgRatingService: EsgRatingService,
    private CompanyService: CompanyService,
    private fb: FormBuilder
  ) {
    this.CompanyService.getByUser().subscribe({
      next: (data) => {
        this.loadList(data._id)
      },
      error: (err) => {
        console.log(err)
      }
    })

    this.form = fb.group({
      filter: ['FILTER_BY_SUPPLIER']
    })
  }

  loadList(companyId: string) {
    this.EsgRatingService.list().subscribe({
      next: (data) => {
        let myCompanyInfo = data.filter(item => {
          return item.company._id === companyId
        })

        this.averageResult = this.checkAverage(myCompanyInfo)
        console.log(this.averageResult)
        this.loading = false
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  checkAverage(data: any): any {
    let averageScoreEnvironmental = 0
    let averageScoreSocial = 0
    let averageScoreGovernance = 0
    let averageScore = 0

    data.forEach((item: any) => {
      averageScoreEnvironmental += item.environmentalScore
      averageScoreSocial += item.socialScore
      averageScoreGovernance += item.governanceScore
      averageScore += item.esgScore
    })
  
    averageScoreEnvironmental = (averageScoreEnvironmental / data.length)
    averageScoreSocial = (averageScoreSocial / data.length)
    averageScoreGovernance = (averageScoreGovernance / data.length)
    averageScore = (averageScore / data.length)

    return {
      averageScoreEnvironmental,
      averageScoreSocial,
      averageScoreGovernance,
      averageScore
    };
  }

  toggleAccordion(number: number) {
    // Remove se tiver
    if(this.openAccordions.includes(number)) {
      this.openAccordions = this.openAccordions.filter((i) => {
        return i !== number
      })
      return
    }
    
    // Inclui se nao tiver
    this.openAccordions.push(number)
  }
}
