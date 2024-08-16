import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { EsgRatingService } from 'src/app/services/esg-rating.service';

@Component({
  selector: 'app-improvements',
  templateUrl: './improvements.component.html',
  styleUrls: ['./improvements.component.scss']
})
export class ImprovementsComponent implements OnInit {
  id = ''

  openAccordions: number[] = []
  selectedESG = ''
  companyInfo: any
  assesmentInfo: any

  constructor(
    private CompanyService: CompanyService,
    private EsgRatingService: EsgRatingService,
    private route: ActivatedRoute,
  ){

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })

    this.EsgRatingService.getById(this.id).subscribe({
      next: (data) => {
        this.assesmentInfo = data
        console.log(data)
      }, error: (err) => {
        console.log(err)
      }
    })

    this.CompanyService.getByUser().subscribe({
      next: (data) => {
        this.companyInfo = data

        // if(data.section === 'Agribusiness') {
        // }

        // if(data.section === 'Industry') {
        // }

        // if(data.section === 'Services') {
        // }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  changeSelectedESG(number: number) {
    this.openAccordions = []

    if(number <= 4) this.selectedESG = "environmental"
    if(number > 4 && number <= 8) this.selectedESG = "social"
    if(number > 8 && number <= 12) this.selectedESG = "governmental"

    this.toggleAccordion(number)
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
