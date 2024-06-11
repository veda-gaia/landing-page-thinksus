import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  avaliationStatus = ''
  userName = ''

  constructor(

  ) {
    this.avaliationStatus = 'pre-avaliation'

    const user = localStorage.getItem('user')
    if(user) this.userName = JSON.parse(user).name
  }

  toggleAvaliationStatus() {
    if(this.avaliationStatus === 'pre-avaliation') {
      this.avaliationStatus = 'post-avaliation'
    } else this.avaliationStatus = 'pre-avaliation'
  }
}
