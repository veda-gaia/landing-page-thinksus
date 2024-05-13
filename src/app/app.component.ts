import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  openSelectorLanguage = false
  selectedLanguage: string

  constructor(
    private translateService: TranslateService
  ){
    const userLang = navigator.language || 'pt';
    const languageCode = userLang.split('-')[0]
    this.selectedLanguage = languageCode

    this.translateService.setDefaultLang(languageCode)
    this.translateService.use(languageCode)
    // this.translateService.onLangChange.subscribe({
    //   next: (data: any) => {
    //     console.log(data)
    //   }
    // })
  }
  
  changeLanguage(language: string) {
    this.selectedLanguage = language
    this.translateService.use(language)
  }

  toggleSelector() {
    this.openSelectorLanguage = !this.openSelectorLanguage
  }
}
