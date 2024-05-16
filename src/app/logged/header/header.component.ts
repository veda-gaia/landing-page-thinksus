import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  selectedLanguage: string = ''

  menuMobileOpen = false;

  constructor(
    private translateService: TranslateService
  ){}
  
  ngOnInit() {
    this.selectedLanguage = this.translateService.currentLang
  }
    
  changeLanguage(language: string) {
    this.selectedLanguage = language
    this.translateService.use(language)
  }

  toggleMenuMobile() {
    this.menuMobileOpen = !this.menuMobileOpen
  }
  
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
