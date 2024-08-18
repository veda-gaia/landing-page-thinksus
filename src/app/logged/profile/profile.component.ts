import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  myContractsList: any[] = []

  constructor() {
    // Mock
    this.myContractsList = [
      {
        name: "Certificado Ouro",
        company: "ColabX",
        emissionDate: "28/08/2023",
      },
      {
        name: "Certificado Prata",
        company: "ColabX",
        emissionDate: "28/08/2022",
      },
      {
        name: "Certificado Bronze",
        company: "ColabX",
        emissionDate: "28/08/2021",
      },
    ]
  }
}
