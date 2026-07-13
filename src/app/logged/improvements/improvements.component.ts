import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';
import { EsgRatingService } from 'src/app/services/esg-rating.service';
import { AiSuggestionService } from 'src/app/services/ai-suggestion.service';
import { TranslateService } from '@ngx-translate/core';

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

  currentLanguage = 'pt';
  suggestionsGrouped: { [key: number]: any[] } = {};

  constructor(
    private CompanyService: CompanyService,
    private EsgRatingService: EsgRatingService,
    private AiSuggestionService: AiSuggestionService,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private spinnerService: NgxSpinnerService
  ){
    // Initialize grouped suggestions structure
    for (let i = 1; i <= 12; i++) {
      this.suggestionsGrouped[i] = [];
    }
  }

  ngOnInit() {
    this.currentLanguage = this.translateService.currentLang || 'pt';
    this.translateService.onLangChange.subscribe(event => {
      this.currentLanguage = event.lang;
    });

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
          next: (compData) => {
            this.companyInfo = compData
          },
          error: (err) => {
            console.log(err)
          }
        })
        this.assesmentInfo = data
        this.handleScoresInfo()
        this.loadAiSuggestions();
        console.log(data)
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  loadAiSuggestions() {
    const AREA_NAME_TO_INDEX: { [key: string]: number } = {
      'Natureza': 1,
      'Recursos naturais': 2,
      'Clima e risco': 3,
      'Gestão de resíduos e poluição': 4,
      'Trabalho justo': 5,
      'Comunidade': 6,
      'Sociedade': 7,
      'Cadeia de valor': 8,
      'Risco': 9,
      'Econômica': 10,
      'Gestão': 11,
      'Transparência': 12
    };

    this.AiSuggestionService.getByRating(this.id).subscribe({
      next: (res: any) => {
        const aiSuggestionDocs = res || [];
        const allSuggestions: any[] = [];
        aiSuggestionDocs.forEach((doc: any) => {
          if (doc.suggestions && Array.isArray(doc.suggestions)) {
            allSuggestions.push(...doc.suggestions);
          }
        });

        // Filter only approved/edited ones
        const approvedSuggestions = allSuggestions.filter(
          (s: any) => s.status === 'APPROVED' || s.status === 'EDITED'
        );

        // Group them by area index
        approvedSuggestions.forEach((sug: any) => {
          const matchedAnswer = this.assesmentInfo?.answers?.find(
            (ans: any) => String(ans.questionId?._id || ans.questionId) === String(sug.questionId)
          );

          if (matchedAnswer && matchedAnswer.questionId && matchedAnswer.questionId.area) {
            const areaName = matchedAnswer.questionId.area.name;
            const index = AREA_NAME_TO_INDEX[areaName];
            if (index && this.suggestionsGrouped[index]) {
              this.suggestionsGrouped[index].push(sug);
            }
          }
        });
      },
      error: (err) => {
        console.error('Error loading AI suggestions:', err);
      }
    });
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