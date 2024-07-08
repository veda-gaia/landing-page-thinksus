import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  openSelectorLanguage = false
  selectedLanguage: string = ''

  constructor(
    private translateService: TranslateService
  ){
  }
  
  ngOnInit() {
    this.selectedLanguage = this.translateService.currentLang
  }
    
  changeLanguage(language: string) {
    this.selectedLanguage = language
    this.translateService.use(language)
  }

  toggleSelector() {
    this.openSelectorLanguage = !this.openSelectorLanguage
  }
}
