import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent {
  form: FormGroup
  list: any[] = []
  filteredList: any[] = []

  constructor(
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      search: [''],
      orderBy: [''],
    })

    this.list = [
      {
        seal: '',
        name: 'Exemplo LTDA',
        buyValue: 1000000,
        currency: 'BRL',
        score: 55.4,
        document: '000000000000'
      },
      {
        seal: '',
        name: 'Exemplo LTDA',
        buyValue: 1000000,
        currency: 'BRL',
        score: 55.4,
        document: '000000000000'
      },
      {
        seal: '',
        name: 'Exemplo LTDA',
        buyValue: 1000000,
        currency: 'BRL',
        score: 55.4,
        document: '000000000000'
      },
      {
        seal: '',
        name: 'Exemplo LTDA',
        buyValue: 1000000,
        currency: 'BRL',
        score: 55.4,
        document: '000000000000'
      },
      {
        seal: '',
        name: 'Exemplo LTDA',
        buyValue: 1000000,
        currency: 'BRL',
        score: 55.4,
        document: '000000000000'
      },
    ]

    this.filteredList = this.list
  }


}
