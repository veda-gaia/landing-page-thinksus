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

  constructor(
    private EsgRatingService: EsgRatingService
  ) {

    this.loadList()
  }

  loadList() {
    this.EsgRatingService.list().subscribe({
      next: (data) => {
        // console.log(data)
        this.loading = false

        if(!data.length) {
          this.avaliationStatus = 'pre-avaliation'
          return
        }
        
        this.list = data
        this.filteredList = this.list
        this.recentResult = this.checkRecent()

        this.avaliationStatus = 'post-avaliation'
        console.log(this.recentResult)
      },
      error: (err) => {
        console.log(err)
        this.loading = false
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
