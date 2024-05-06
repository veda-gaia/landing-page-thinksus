import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  openSelectorLanguage = false
  selectedLanguage: string

  constructor(){
    this.selectedLanguage = 'pt-BR'
  }

  changeLanguage(language: string) {
    this.selectedLanguage = language
  }

  toggleSelector() {
    this.openSelectorLanguage = !this.openSelectorLanguage
  }
}
