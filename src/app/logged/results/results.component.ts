import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';
import { EsgRatingService } from 'src/app/services/esg-rating.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  avaliationStatus = ''
  userName = ''

  list: any[] = []
  filteredList: any[] = []
  recentResult: any

  loading = true
  graphData: any = []
  graphConfig: any = { 
    displayModeBar: false,
    responsive: true,
    scrollZoom: false,
    staticPlot: true
  }

  constructor(
    private EsgRatingService: EsgRatingService,
    private CompanyService: CompanyService,
    private spinnerService: NgxSpinnerService
  ) {
    this.spinnerService.show()
    this.CompanyService.getByUser().pipe(
      finalize(() => {
        this.spinnerService.hide()
      })
    ).subscribe({
      next: (data) => {
        this.userName = data.user.name
        
        this.loadList()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  
  loadList() {
    this.spinnerService.show();
    this.EsgRatingService.getByCompany().pipe(
      finalize(() => {
        this.spinnerService.hide()
      })
    ).subscribe({
      next: (data) => {
        // Pega o item que pertence a minha empresa
        this.list = data.filter(item => {
          return item.status === "COMPLETED"
        })

        this.list.sort((a, b) => {
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        });

        this.filteredList = [...this.list]

        console.log(this.filteredList)

        this.loading = false

        if(!this.list.length) {
          this.avaliationStatus = 'pre-avaliation'
          return
        }

        this.avaliationStatus = 'post-avaliation'
        this.recentResult = this.checkRecent()
        this.loadGraph()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  downloadReport() {
    this.spinnerService.show()
    this.EsgRatingService.donwloadReport().pipe(
      finalize(() => {
        this.spinnerService.hide()
      })
    ).subscribe({
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

  loadGraph() {
    const dates: string[] = this.list.map(avaliation => {
      const date = new Date(avaliation.updatedAt);
      const day = String(date.getUTCDate()).padStart(2, '0');  // Formata o dia para 2 dígitos
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');  // Formata o mês para 2 dígitos (janeiro é 0)
      return `${day}/${month}`;
    }).reverse();

    const envrironmentalData = this.list.map(avaliation => {
      return avaliation.environmentalScore.toFixed()
    }).reverse()

    const governmentalData = this.list.map(avaliation => {
      return avaliation.governanceScore.toFixed()
    }).reverse()

    const socialData = this.list.map(avaliation => {
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

  checkRecent(): any[] {
    let mostRecentObject = this.filteredList[0];

    this.filteredList.forEach(obj => {
      if (new Date(obj.updatedAt) > new Date(mostRecentObject.updatedAt)) {
        mostRecentObject = obj;
      }
    });
  
    return mostRecentObject;
  }
}
