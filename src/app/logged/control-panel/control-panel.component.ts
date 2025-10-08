import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';
import { EsgRatingService } from 'src/app/services/esg-rating.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
})
export class ControlPanelComponent implements OnInit {
  form: FormGroup;
  loading = true;

  openAccordions: number[] = [];
  averageResult: any;

  odsScoreArray: any[] = [];

  supplierScoresArray: any[] = [];

  environmentalAreaScores: any = {
    environmental_NatureScore: 0,
    environmental_Natural_ResourcesScore: 0,
    environmental_Waste_ManagementScore: 0,
    environmental_Climate_RiskScore: 0,
  };

  socialAreaScores: any = {
    social_Fair_WorkScore: 0,
    social_CommunityScore: 0,
    social_SocietyScore: 0,
    social_Value_ChainScore: 0,
  };

  governanceAreaScores: any = {
    governance_RiskScore: 0,
    governance_ManagementScore: 0,
    governance_TransparencyScore: 0,
    governance_EconomicScore: 0,
  };

  performanceScores: any = {
    environmentScore: 0,
    socialScore: 0,
    governanceScore: 0,
    esgScore: 0,
  };

  constructor(
    private EsgRatingService: EsgRatingService,
    private CompanyService: CompanyService,
    private fb: FormBuilder,
    private spinnerService: NgxSpinnerService
  ) {
    this.spinnerService.show();

    this.EsgRatingService.getByCompany()
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        })
      )
      .subscribe({
        next: (data) => {
          this.loading = false;
        },
        error: (err) => {
          console.log(err);
        },
      });

    this.form = fb.group({
      filter: ['FILTER_BY_SUPPLIER'],
    });
  }

  ngOnInit() {
    this.spinnerService.show();
    this.CompanyService.buildAggregatedReportEsgResult()
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        })
      )
      .subscribe({
        next: (data) => {
          this.supplierScoresArray = data.esgRatingFornecedores;
          this.performanceScores.environmentScore = data.environmentalScore;
          this.performanceScores.socialScore = data.socialScore;
          this.performanceScores.governanceScore = data.governanceScore;
          this.odsScoreArray = data.odsScores;
          this.performanceScores.esgScore = data.esgScore;

          this.environmentalAreaScores.environmental_NatureScore =
            data.environmentalAreaScores?.environmental_NatureScore;
          this.environmentalAreaScores.environmental_Natural_ResourcesScore =
            data.environmentalAreaScores?.environmental_Natural_ResourcesScore;
          this.environmentalAreaScores.environmental_Waste_ManagementScore =
            data.environmentalAreaScores?.environmental_Waste_ManagementScore;
          this.environmentalAreaScores.environmental_Climate_RiskScore =
            data.environmentalAreaScores?.environmental_Climate_RiskScore;

          this.socialAreaScores.social_Fair_WorkScore =
            data.socialAreaScores?.social_Fair_WorkScore;
          this.socialAreaScores.social_CommunityScore =
            data.socialAreaScores?.social_CommunityScore;
          this.socialAreaScores.social_SocietyScore =
            data.socialAreaScores?.social_SocietyScore;
          this.socialAreaScores.social_Value_ChainScore =
            data.socialAreaScores?.social_Value_ChainScore;

          this.governanceAreaScores.governance_RiskScore =
            data.governanceAreaScores?.governance_RiskScore;
          this.governanceAreaScores.governance_ManagementScore =
            data.governanceAreaScores?.governance_ManagementScore;
          this.governanceAreaScores.governance_TransparencyScore =
            data.governanceAreaScores?.governance_TransparencyScore;
          this.governanceAreaScores.governance_EconomicScore =
            data.governanceAreaScores?.governance_EconomicScore;
        },
      });
  }

  toggleAccordion(number: number) {
    // Remove se tiver
    if (this.openAccordions.includes(number)) {
      this.openAccordions = this.openAccordions.filter((i) => {
        return i !== number;
      });
      return;
    }

    // Inclui se nao tiver
    this.openAccordions.push(number);
  }
}
