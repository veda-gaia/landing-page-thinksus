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
