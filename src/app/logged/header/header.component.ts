import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';
import LocalStorageUtil, { LocalStorageKeys } from 'src/app/util/localStorage.util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  selectedLanguage: string = ''

  menuMobileOpen = false;
  user: any
  company: any

  constructor(
    private translateService: TranslateService,
    private UserService: UserService,
    private CompanyService: CompanyService,
    private router: Router,
    private spinnerService: NgxSpinnerService
  ){
    this.spinnerService.show()
    this.CompanyService.getByUser().pipe(
      finalize(() => {
        this.spinnerService.hide()
      })
    ).subscribe({
      next: (data) => {
        this.company = data.company
        this.user = data.user
      },
      error: (err) => {
        console.log(err)
      }
    })    
  }
  
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
