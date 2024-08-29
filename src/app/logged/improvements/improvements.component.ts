import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
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

  environmentalScoresArray: any[] = []
  socialScoresArray: any[] = []
  governanceScoresArray: any[] = []

  constructor(
    private CompanyService: CompanyService,
    private EsgRatingService: EsgRatingService,
    private route: ActivatedRoute,
    private spinnerService: NgxSpinnerService
  ){

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })
    this.spinnerService.show()
    this.EsgRatingService.getById(this.id).pipe(
      finalize(() => {
        this.spinnerService.hide()
      })
    ).subscribe({
      next: (data) => {

        this.CompanyService.getByUser().subscribe({
          next: (data) => {
            this.companyInfo = data
          },
          error: (err) => {
            console.log(err)
          }
        })
        this.assesmentInfo = data
        this.handleScoresInfo()
        console.log(data)
      }, error: (err) => {
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

  handleScoresInfo() {
    const orderEnvironmental: string[] = ["Nature", "Natural_Resources", "Climate_Risk", "Waste_Management"]
    this.environmentalScoresArray = this.assesmentInfo.areaScore.filter((i: any) => {
      return orderEnvironmental.includes(i.area)
    })
    this.environmentalScoresArray.sort((a, b) => {
      const indexA = orderEnvironmental.indexOf(a.area);
      const indexB = orderEnvironmental.indexOf(b.area);
      return indexA - indexB;
    });

    const orderSocial: string[] = ["Fair_Work", "Community", "Society", "Value_Chain"]
    this.socialScoresArray = this.assesmentInfo.areaScore.filter((i: any) => {
      return orderSocial.includes(i.area)
    })
    this.socialScoresArray.sort((a, b) => {
      const indexA = orderSocial.indexOf(a.area);
      const indexB = orderSocial.indexOf(b.area);
      return indexA - indexB;
    });

    const orderGovernance: string[] = ["Risk", "Economic", "Management", "Transparency"]
    this.governanceScoresArray = this.assesmentInfo.areaScore.filter((i: any) => {
      return orderGovernance.includes(i.area)
    })
    this.governanceScoresArray.sort((a, b) => {
      const indexA = orderGovernance.indexOf(a.area);
      const indexB = orderGovernance.indexOf(b.area);
      return indexA - indexB;
    });
  }
}
