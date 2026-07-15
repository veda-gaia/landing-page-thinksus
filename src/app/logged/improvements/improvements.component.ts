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

  // Ordem estável (AnswerAreaEnum) de cada bloco do acordeão, dentro do seu pilar.
  // Reaproveitada tanto para os scores (handleScoresInfo) quanto para mapear
  // cada sugestão de IA ao bloco correto (loadAiSuggestions), usando o campo
  // estável `DimensionArea.code` em vez do nome traduzível.
  private readonly orderEnvironmental: string[] = ['Nature', 'Natural_Resources', 'Climate_Risk', 'Waste_Management'];
  private readonly orderSocial: string[] = ['Fair_Work', 'Community', 'Society', 'Value_Chain'];
  private readonly orderGovernance: string[] = ['Risk', 'Economic', 'Management', 'Transparency'];

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

  /**
   * Resolve o índice do bloco do acordeão (1-12) para um código estável de
   * área (`DimensionArea.code`, valores de `AnswerAreaEnum`). Usa a mesma
   * ordem de `handleScoresInfo()` como fonte única de verdade.
   */
  private accordionIndexForAreaCode(code: string): number | null {
    const envIndex = this.orderEnvironmental.indexOf(code);
    if (envIndex !== -1) return envIndex + 1;

    const socialIndex = this.orderSocial.indexOf(code);
    if (socialIndex !== -1) return socialIndex + 5;

    const govIndex = this.orderGovernance.indexOf(code);
    if (govIndex !== -1) return govIndex + 9;

    return null;
  }

  loadAiSuggestions() {
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

        // Group them by area index (código estável, não pelo nome traduzível)
        approvedSuggestions.forEach((sug: any) => {
          const matchedAnswer = this.assesmentInfo?.answers?.find(
            (ans: any) => String(ans.questionId?._id || ans.questionId) === String(sug.questionId)
          );

          const areaCode = matchedAnswer?.questionId?.area?.code;
          if (!areaCode) {
            console.error(
              `[Improvements] Sugestão ${sug._id} não pôde ser agrupada: DimensionArea sem "code" para a questão ${sug.questionId}.`,
            );
            return;
          }

          const index = this.accordionIndexForAreaCode(areaCode);
          if (index && this.suggestionsGrouped[index]) {
            this.suggestionsGrouped[index].push(sug);
          } else {
            console.error(
              `[Improvements] Código de área "${areaCode}" não corresponde a nenhum bloco do acordeão (sugestão ${sug._id}).`,
            );
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
    this.environmentalScoresArray = this.assesmentInfo.areaScore.filter((i: any) => {
      return this.orderEnvironmental.includes(i.area)
    })
    this.environmentalScoresArray.sort((a, b) => {
      const indexA = this.orderEnvironmental.indexOf(a.area);
      const indexB = this.orderEnvironmental.indexOf(b.area);
      return indexA - indexB;
    });

    this.socialScoresArray = this.assesmentInfo.areaScore.filter((i: any) => {
      return this.orderSocial.includes(i.area)
    })
    this.socialScoresArray.sort((a, b) => {
      const indexA = this.orderSocial.indexOf(a.area);
      const indexB = this.orderSocial.indexOf(b.area);
      return indexA - indexB;
    });

    this.governanceScoresArray = this.assesmentInfo.areaScore.filter((i: any) => {
      return this.orderGovernance.includes(i.area)
    })
    this.governanceScoresArray.sort((a, b) => {
      const indexA = this.orderGovernance.indexOf(a.area);
      const indexB = this.orderGovernance.indexOf(b.area);
      return indexA - indexB;
    });
  }
}