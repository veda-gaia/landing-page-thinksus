import { Component } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  avaliationStatus = ''
  list: any[] = []
  filteredList: any[] = []

  constructor() {
    this.avaliationStatus = 'pre-avaliation'

    this.loadList()
  }

  loadList() {
    this.list = [
      {
        seal: '',
        title: 'Exemplo LTDA',
        buyValue: 1000000,
        currency: 'BRL',
        score: 55.4,
        createdAt: '00/00/0000'
      },
      {
        seal: '',
        title: 'Exemplo LTDA',
        buyValue: 1000000,
        currency: 'BRL',
        score: 55.4,
        createdAt: '00/00/0000'
      },
      {
        seal: '',
        title: 'Exemplo LTDA',
        buyValue: 1000000,
        currency: 'BRL',
        score: 55.4,
        createdAt: '00/00/0000'
      },
      {
        seal: '',
        title: 'Exemplo LTDA',
        buyValue: 1000000,
        currency: 'BRL',
        score: 55.4,
        createdAt: '00/00/0000'
      },
      {
        seal: '',
        title: 'Exemplo LTDA',
        buyValue: 1000000,
        currency: 'BRL',
        score: 55.4,
        createdAt: '00/00/0000'
      },
    ]
    this.filteredList = this.list
  }

  toggleAvaliationStatus() {
    if(this.avaliationStatus === 'pre-avaliation') {
      this.avaliationStatus = 'post-avaliation'
    } else this.avaliationStatus = 'pre-avaliation'
  }
}
