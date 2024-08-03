import { Component } from '@angular/core';
import { EsgRatingService } from 'src/app/services/esg-rating.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  avaliationStatus = ''

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
    private EsgRatingService: EsgRatingService
  ) {
    this.loadList()

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

  loadList() {
    this.EsgRatingService.list().subscribe({
      next: (data) => {
        console.log(data)

        if(!data.length) {
          this.avaliationStatus = 'pre-avaliation'
          return
        }
        
        this.list = data
        this.filteredList = this.list
        this.recentResult = this.checkRecent()

        this.avaliationStatus = 'post-avaliation'
        // console.log(this.recentResult)
        this.loading = false
      },
      error: (err) => {
        console.log(err)
      }
    })
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
