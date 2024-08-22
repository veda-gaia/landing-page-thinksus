import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { EsgRatingService } from 'src/app/services/esg-rating.service';
import LocalStorageUtil, { LocalStorageKeys } from 'src/app/util/localStorage.util';
import { initialScoreArray } from 'src/app/util/initial-score-array.util';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  sidebarOpen = true;

  verifyRequested: string = 'false';

  companyResponse: any;

  classPerScore: string = '';

  odsScoreArray: any[] = [];
  allCompleteAvaliations: any[] = []
  postAvaliationInfo: any;
  avaliationStatus = '';
  environmentalInfo = {
    progress: 0,
    score: 0,
  };
  socialInfo = {
    progress: 0,
    score: 0,
  };
  governanceInfo = {
    progress: 0,
    score: 0,
  };
  constructor(
    private router: Router,
    private esgRatingService: EsgRatingService,
  ) {
  }

  ngOnInit() {
    this.esgRatingService.getByCompany().subscribe({
      next: (data) => {
        if (!Object.keys(data).length) {
          this.verifyRequested = 'content';
        }
        this.companyResponse = data[0];
        console.log('teste', this.companyResponse);

        this.verifyRequested = 'view';
      },
      error: (err) => {
        console.log(err);
      },
    });
  }



  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen
  }

  logout() {
    this.router.navigate(['/home'])
    LocalStorageUtil.remove(LocalStorageKeys.user)
  }

  getTitle() {
    switch (this.companyResponse) {
      case this.companyResponse?.title:
        return 'teste'
      default:
        return 'teste'
    }
  }

  getClassPerScore() {
    if (this.companyResponse) {
      const socialScore = +this.companyResponse?.socialScore.toFixed();
      if (socialScore <= 35) {
        return 'gap-base';
      } else if (socialScore > 35 && socialScore <= 59) {
        return 'gap-bronze';
      } else if (socialScore >= 60 && socialScore <= 80) {
        return 'gap-silver';
      } else if (socialScore >= 81) {
        return 'gap-gold';
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  getScore() {
    if(this.companyResponse) {
      return this.companyResponse.socialScore.toFixed()
    }
  }
}
