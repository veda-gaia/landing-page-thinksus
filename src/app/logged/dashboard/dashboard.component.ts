import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { EsgRatingService } from 'src/app/services/esg-rating.service';
import { initialScoreArray } from 'src/app/util/initial-score-array.util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  avaliationStatus = '';
  userName = '';
  companySection = 'agro';
  loading = true;

  graphData: any = [];
  graphConfig: any = {
    displayModeBar: false,
    responsive: true,
    scrollZoom: false,
    staticPlot: true,
  };

  environmentalQuestions = 0;
  socialQuestions = 0;
  governanceQuestions = 0;

  environmentalInfo = {
    progress: 0,
    score: 0,
  };
  socialInfo = {
    progress: 0,
    score: 0,
  };
  governanceInfo = {
    progress: 0,
    score: 0,
  };
  distributionESG: any = {
    environmental: 0,
    governance: 0,
    social: 0,
  }

  odsScoreArray: any[] = [];
  postOdsScoreArray: any[] = [];
  allCompleteAvaliations: any[] = []
  postAvaliationInfo: any;

  constructor(
    private EsgRatingService: EsgRatingService,
    private CompanyService: CompanyService
  ) {}

  ngOnInit() {
    this.CompanyService.getByUser().subscribe({
      next: (data) => {
        this.userName = data.user.name;
        if (data.section === 'Agribusiness') {
          this.environmentalQuestions = 13;
          this.socialQuestions = 15;
          this.governanceQuestions = 14;

          this.companySection = 'agro';
        }

        if (data.section === 'Industry') {
          this.environmentalQuestions = 12;
          this.socialQuestions = 15;
          this.governanceQuestions = 14;

          this.companySection = 'industry';
        }

        if (data.section === 'Services') {
          this.environmentalQuestions = 13;
          this.socialQuestions = 15;
          this.governanceQuestions = 14;

          this.companySection = 'service';
        }

        this.handleInfo();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleInfo() {
    this.EsgRatingService.getByCompany().subscribe({
      next: (data) => {
        this.allCompleteAvaliations = data.filter((item) => {
          return item.status === 'COMPLETED';
        })

        this.allCompleteAvaliations.sort((a, b) => {
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        });

        let inProgressAvaliation = data.filter((item) => {
          return item.status === 'IN_PROGRESS';
        })[0];

        let postAvaliation = this.allCompleteAvaliations[0];

        if (!inProgressAvaliation) {
          this.avaliationStatus = 'pre-avaliation';

          this.environmentalInfo = {
            progress: 0,
            score: 0,
          };

          this.socialInfo = {
            progress: 0,
            score: 0,
          };

          this.governanceInfo = {
            progress: 0,
            score: 0,
          };

          this.odsScoreArray = initialScoreArray;
        }

        if (inProgressAvaliation) {
          this.avaliationStatus = 'pre-avaliation';

          if (inProgressAvaliation) {
            this.avaliationStatus = 'pre-avaliation';

            const environmentalAnswers = inProgressAvaliation.answers.filter(
              (i: any) => {
                return i.questionNumber.startsWith('E');
              }
            );

            const socialAnswers = inProgressAvaliation.answers.filter(
              (i: any) => {
                return i.questionNumber.startsWith('S');
              }
            );

            const governanceAnswers = inProgressAvaliation.answers.filter(
              (i: any) => {
                return i.questionNumber.startsWith('G');
              }
            );

            if (environmentalAnswers.length) {
              this.environmentalInfo = {
                progress: environmentalAnswers.length,
                score: inProgressAvaliation.environmentalScore.toFixed(0),
              };
            }

            if (socialAnswers.length) {
              this.socialInfo = {
                progress: socialAnswers.length,
                score: inProgressAvaliation.socialScore.toFixed(0),
              };
            }

            if (governanceAnswers.length) {
              this.governanceInfo = {
                progress: governanceAnswers.length,
                score: inProgressAvaliation.governanceScore.toFixed(0),
              };
            }

            this.odsScoreArray = inProgressAvaliation.odsScore;
          }
        }

        if (postAvaliation) {
          this.postAvaliationInfo = postAvaliation;
          this.avaliationStatus = 'post-avaliation';
          this.postOdsScoreArray = postAvaliation.odsScore

          this.distributionESG = {
            environmental: (((postAvaliation.environmentalScore / postAvaliation.esgScore) / 3) * 100).toFixed(2),
            governance: (((postAvaliation.governanceScore / postAvaliation.esgScore) / 3) * 100).toFixed(2),
            social: (((postAvaliation.socialScore / postAvaliation.esgScore) / 3) * 100).toFixed(2),
          }
        }
        
        if(this.allCompleteAvaliations.length >= 2) {
          this.handleGraphicStatistics()
        }
        
        this.loading = false;
      },
      error: (err) => {
        console.error(err), (this.loading = false);
      },
    });
  }

  downloadReport() {
    this.EsgRatingService.donwloadReport().subscribe({
      next: data => {
        if (data && data.report) {
          const byteCharacters = atob(data.report);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'application/pdf' });
  
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'relatorio.pdf';
  
          link.click();
  
          URL.revokeObjectURL(link.href);
        } else {
          console.error('O objeto data não contém o relatório em base64.');
        }
      },
      error: err => {
        console.error('Erro ao fazer o download do relatório:', err);
      }
    });
  }

  // Define as informaçõoes do Gráfico
  handleGraphicStatistics() {
    const dates: string[] = this.allCompleteAvaliations.map(avaliation => {
      const date = new Date(avaliation.updatedAt);
      const day = String(date.getUTCDate()).padStart(2, '0');  // Formata o dia para 2 dígitos
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');  // Formata o mês para 2 dígitos (janeiro é 0)
      return `${day}/${month}`;
    }).reverse();

    const envrironmentalData = this.allCompleteAvaliations.map(avaliation => {
      return avaliation.environmentalScore.toFixed()
    }).reverse()

    const governmentalData = this.allCompleteAvaliations.map(avaliation => {
      return avaliation.governanceScore.toFixed()
    }).reverse()

    const socialData = this.allCompleteAvaliations.map(avaliation => {
      return avaliation.socialScore.toFixed()
    }).reverse()

    const graphEnvironmental = {
      x: dates,
      y: envrironmentalData,
      mode: 'lines+markers',
      type: 'scatter',
      name: 'Ambiental',
    };

    const graphGovernmental = {
      x: dates,
      y: governmentalData,
      mode: 'lines+markers',
      type: 'scatter',
      name: 'Governança',
    };

    const graphSocial = {
      x: dates,
      y: socialData,
      mode: 'lines+markers',
      type: 'scatter',
      name: 'Social',
    };

    this.graphData.push(graphGovernmental);
    this.graphData.push(graphSocial);
    this.graphData.push(graphEnvironmental);
  }

  toggleAvaliationStatus() {
    if (this.avaliationStatus === 'pre-avaliation') {
      this.avaliationStatus = 'post-avaliation';
    } else this.avaliationStatus = 'pre-avaliation';
  }
}
