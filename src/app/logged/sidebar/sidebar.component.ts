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

  companyScoreResponse: any;

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

    // this.allCompleteAvaliations = data.filter((item) => {
    //   return item.status === 'COMPLETED';
    // })

    // this.allCompleteAvaliations.sort((a, b) => {
    //   return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    // });

    // let postAvaliation = this.allCompleteAvaliations[0];

    this.esgRatingService.getByCompany().subscribe({
      next: (data) => {
        const allCompleteAvaliations = data.filter((item) => {
          return item.status === 'COMPLETED';
        })

        allCompleteAvaliations.sort((a, b) => {
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        });

        this.companyScoreResponse = allCompleteAvaliations[0];
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
    if (this.companyScoreResponse) {
      const socialScore = +this.companyScoreResponse?.esgScore.toFixed();
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
    if (this.companyScoreResponse) {
      const socialScore = +this.companyScoreResponse?.esgScore.toFixed();

      if (socialScore <= 35) {
        return 'gap-base';
      }
      if (socialScore > 35 && socialScore <= 59) {
        return 'gap-bronze';
      }
      if (socialScore >= 60 && socialScore <= 80) {
        return 'gap-silver';
      }
      if (socialScore >= 81) {
        return 'gap-gold';
      }
      
      return '';
    }

    return '';
  }

  getScore() {
    if (this.companyScoreResponse) {
      return this.companyScoreResponse.esgScore.toFixed()
    }
  }
}
