import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  avaliationStatus = ''

  constructor(

  ) {
    this.avaliationStatus = 'pre-avaliation'
  }

  toggleAvaliationStatus() {
    if(this.avaliationStatus === 'pre-avaliation') {
      this.avaliationStatus = 'post-avaliation'
    } else this.avaliationStatus = 'pre-avaliation'
  }
}
