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
          return
        }
        const last = data.sort((a: any, b: any) => b.createdAt - a.createdAt);
        console.log(last);
        
        this.companyResponse = data[0];
        this.verifyRequested = 'view';
      },
      error: (err) => {
        console.error(err);
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
    if (this.companyResponse) {
      const socialScore = +this.companyResponse?.esgScore.toFixed();
      if (socialScore <= 35) {
        return 'Convencional';
      } else if (socialScore > 35 && socialScore <= 59) {
        return 'Compliance';
      } else if (socialScore >= 60 && socialScore <= 80) {
        return 'Consciente';
      } else if (socialScore >= 81) {
        return 'Superior';
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  getClassPerScore() {
    if (this.companyResponse) {
      const socialScore = +this.companyResponse?.esgScore.toFixed();
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
    if (this.companyResponse) {
      return this.companyResponse.esgScore.toFixed()
    }
  }
}
