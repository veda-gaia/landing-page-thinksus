import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { EsgRatingService } from 'src/app/services/esg-rating.service';
import LocalStorageUtil, {
  LocalStorageKeys,
} from 'src/app/util/localStorage.util';
import { initialScoreArray } from 'src/app/util/initial-score-array.util';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, switchMap } from 'rxjs';
import { ContractedPlanService } from 'src/app/services/contracted-plan.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  sidebarOpen = true;

  verifyRequested: string = 'false';

  companyScoreResponse: any;

  classPerScore: string = '';

  odsScoreArray: any[] = [];
  allCompleteAvaliations: any[] = [];
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

  isContractedPlan = false;
  isUserSupplier = false;

  constructor(
    private router: Router,
    private esgRatingService: EsgRatingService,
    private spinnerService: NgxSpinnerService,
    private contractedPlanService: ContractedPlanService,
    private companyService: CompanyService
  ) {}

  ngOnInit() {
    this.spinnerService.show();
    this.esgRatingService
      .getByCompany()
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        })
      )
      .subscribe({
        next: (data) => {
          const allCompleteAvaliations = data.filter((item) => {
            return item.status === 'COMPLETED';
          });

          allCompleteAvaliations.sort((a, b) => {
            return (
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            );
          });

          this.companyScoreResponse = allCompleteAvaliations[0];
        },
        error: (err) => {
          console.error(err);
        },
      });

    this.companyService.getByUser().subscribe({
      next: (data) => {
        this.isUserSupplier = data.isSupplier;
      },
    });

    this.companyService
      .getByUser()
      .pipe(
        switchMap((companyData) => {
          // seta o valor da primeira chamada
          this.isUserSupplier = companyData.isSupplier;

          // agora dispara a segunda chamada
          return this.contractedPlanService.getByAuth();
        })
      )
      .subscribe({
        next: (data) => {
          if (!data || data.length === 0) {
            console.log('Nenhum plano contratado encontrado');
            return;
          }

          const subscriptionName = data[0]?.subscription?.name ?? null;

          if (
            subscriptionName?.trim().toUpperCase() === 'SUPPLY CHAIN' &&
            !this.isUserSupplier
          ) {
            this.isContractedPlan = true;
          }
        },
        error: (err) => {
          console.error('Erro na chamada:', err);
        },
      });
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout() {
    this.router.navigate(['/home']);
    LocalStorageUtil.remove(LocalStorageKeys.user);
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
      return this.companyScoreResponse.esgScore.toFixed();
    }
  }
}
