import { Component } from '@angular/core';
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
  ) {
    this.CompanyService.getByUser().subscribe({
      next: (data) => {
        console.log(data)
        this.userName = data.user.name
        
        this.loadList(data._id)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  
  loadList(companyId: string) {
    this.EsgRatingService.list().subscribe({
      next: (data) => {
        // Pega o item que pertence a minha empresa
        this.list = this.filteredList = data.filter(item => {
          return item.company._id === companyId && item.status === "COMPLETED"
        })

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

  loadGraph() {
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
