import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
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

  // odsScoreArray = []
  
  // Mock
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

  // supplierScoresArray = []

  // Mock
  supplierScoresArray = [
    {
      name: 'Matéria prima - Produção',
      score: 57.7
    },
    {
      name: 'Material de Consumo',
      score: 64.3
    },
    {
      name: 'Serviços Operacionais',
      score: 68.7
    },
    {
      name: 'Energia e Recursos',
      score: 81.3
    },
    {
      name: 'Frete e serviços externos',
      score: 62.3
    }
  ]

  // performanceScores: any = {
  //   environmentScore: 0,
  //   socialScore: 0,
  //   governanceScore: 0,
  // }

  // Mock
  performanceScores: any = {
    environmentScore: 57,
    socialScore: 65,
    governanceScore: 68,
  }
  
  constructor(
    private EsgRatingService: EsgRatingService,
    private CompanyService: CompanyService,
    private fb: FormBuilder,
    private spinnerService: NgxSpinnerService
  ) {
    this.spinnerService.show()
    this.EsgRatingService.getByCompany().pipe(
      finalize(() => {
        this.spinnerService.hide()
      })
    ).subscribe({
      next: (data) => {
        this.loading = false
      },
      error: (err) => {
        console.log(err)
      }
    })

    this.form = fb.group({
      filter: ['FILTER_BY_SUPPLIER']
    })
  }

  // Calcula a média ponderada das avaliações
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
