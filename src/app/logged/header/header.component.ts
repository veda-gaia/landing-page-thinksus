import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import LocalStorageUtil, { LocalStorageKeys } from 'src/app/util/localStorage.util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  selectedLanguage: string = ''

  menuMobileOpen = false;

  constructor(
    private translateService: TranslateService,
    private router: Router
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

  logout() {
    this.router.navigate(['/home'])
    LocalStorageUtil.remove(LocalStorageKeys.user)
  }
}
