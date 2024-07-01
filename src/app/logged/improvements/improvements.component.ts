import { Component } from '@angular/core';

@Component({
  selector: 'app-improvements',
  templateUrl: './improvements.component.html',
  styleUrls: ['./improvements.component.scss']
})
export class ImprovementsComponent {
  openAccordions: number[] = []
  selectedESG = ''

  constructor(){

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
