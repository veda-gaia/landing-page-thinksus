import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { updateStatusDto } from 'src/app/dtos/update-status.dto';
import { CompanyService } from 'src/app/services/company.service';
import { ContractedPlanService } from 'src/app/services/contracted-plan.service';
import { EsgRatingService } from 'src/app/services/esg-rating.service';
import { ScoreWarningComponent } from '../score-warning/score-warning.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { EsgFormService } from 'src/app/services/esg-form.service';

@Component({
  selector: 'app-assesment',
  templateUrl: './assesment.component.html',
  styleUrls: ['./assesment.component.scss'],
})
export class AssesmentComponent implements OnInit {
  @ViewChild('contentModal') contentModal: any;
  @ViewChild('avaliacaoModal') avaliacaoModal!: TemplateRef<any>;

  form: FormGroup;

  companySection = 'agro';
  loading = true;

  environmentalQuestions = 0;
  socialQuestions = 0;
  governanceQuestions = 0;

  environmentalProgress = 0;
  socialProgress = 0;
  governanceProgress = 0;

  environmentalAnswers = 0;
  socialAnswers = 0;
  governanceAnswers = 0;

  hasPendingDocumentEnvironmental = false;
  hasPendingDocumentSocial = false;
  hasPendingDocumentGovernance = false;

  sectionId = '';
  segmentId = '';
  esgRatingStatus = '';

  assesmentId = '';
  userHasContractedPlan = false;

  constructor(
    private fb: FormBuilder,
    private EsgRatingService: EsgRatingService,
    private esgFormService: EsgFormService,
    private companyService: CompanyService,
    private toastr: ToastrService,
    private router: Router,
    private contractedPlanService: ContractedPlanService,
    private modalService: NgbModal,
    private translateService: TranslateService,
    private spinnerService: NgxSpinnerService,
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
    });
    this.spinnerService.show();

    this.contractedPlanService.checkContractedPlanByUser().subscribe({
      next: (data: boolean) => {
        this.userHasContractedPlan = data;
      },
    });
  }

  ngOnInit() {
    this.EsgRatingService.getByCompany()
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
      )
      .subscribe({
        next: (data) => {
          const myAnswers = data?.[0]?.answers;

          if (myAnswers?.length) {
            const environmentalAnswers = myAnswers.filter(
              (i: any) => i.questionId.dimension === 'E',
            );

            const socialAnswers = myAnswers.filter(
              (i: any) => i.questionId.dimension === 'S',
            );

            const governanceAnswers = myAnswers.filter(
              (i: any) => i.questionId.dimension === 'G',
            );

            this.environmentalAnswers = environmentalAnswers.length;
            this.socialAnswers = socialAnswers.length;
            this.governanceAnswers = governanceAnswers.length;

            this.hasPendingDocumentEnvironmental = environmentalAnswers.some(
              (i: any) => i.status === 'REJECTED',
            );

            this.hasPendingDocumentSocial = socialAnswers.some(
              (i: any) => i.status === 'REJECTED',
            );

            this.hasPendingDocumentGovernance = governanceAnswers.some(
              (i: any) => i.status === 'REJECTED',
            );
            debugger;

            this.handleInfo(myAnswers[0].questionId?.esgFormId);
            this.assesmentId = data[0]._id;
          }

          this.esgRatingStatus = data[0]?.status;
          this.loading = false;
        },
        error: (err) => {
          console.log(err);
        },
      });

    this.companyService
      .getByUser()
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
      )
      .subscribe({
        next: (data: any) => {
          this.sectionId = data.section?._id;
          this.segmentId = data.segment?._id;

          this.loading = false;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  handleInfo(formId: string) {
    this.spinnerService.show();
    this.esgFormService
      .getbyId(formId)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
      )
      .subscribe({
        next: (data) => {
          this.environmentalQuestions = data.questions.filter((i: any) => {
            return i.dimension == 'E';
          })?.length;

          this.socialQuestions = data.questions.filter((i: any) => {
            return i.dimension == 'S';
          })?.length;

          this.governanceQuestions = data.questions.filter((i: any) => {
            return i.dimension == 'G';
          })?.length;

          if (this.environmentalAnswers) {
            this.environmentalProgress = +(
              (this.environmentalAnswers / this.environmentalQuestions) *
              100
            ).toFixed(0);
          }

          if (this.socialAnswers) {
            this.socialProgress = +(
              (this.socialAnswers / this.socialQuestions) *
              100
            ).toFixed(0);
          }

          if (this.governanceAnswers) {
            this.governanceProgress = +(
              (this.governanceAnswers / this.governanceQuestions) *
              100
            ).toFixed(0);
          }

          this.companySection = data.section.name;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  onSubmit() {
    if (this.form.invalid || !this.assesmentId.length) return;

    const dto: updateStatusDto = {
      status: 'UNDER_ANALYSIS',

      lang: this.translateService.currentLang,
    };
    const titleDto: any = {
      title: this.form.controls['title'].value,
    };
    this.spinnerService.show();

    this.EsgRatingService.updateStatusById(this.assesmentId, dto)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
      )
      .subscribe({
        next: (data) => {
          setTimeout(() => {
            this.EsgRatingService.updateTitleById(
              this.assesmentId,
              titleDto,
            ).subscribe({
              next: (data) => {
                this.toastr.success('Pontuação gerada com sucesso', 'Sucesso', {
                  progressBar: true,
                });

                this.router.navigate(['/logged/home']);
              },
            });
          }, 100);

          this.modalService.open(this.avaliacaoModal, {
            centered: true,
            backdrop: 'static',
            windowClass: 'avaliacao-modal',
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getDisabledReason(): string {
    const reasons = [];
    if (this.form.invalid) reasons.push('Título não preenchido');
    if (this.environmentalProgress !== 100)
      reasons.push(`Ambiental (${this.environmentalProgress}%)`);
    if (this.socialProgress !== 100)
      reasons.push(`Social (${this.socialProgress}%)`);
    if (this.governanceProgress !== 100)
      reasons.push(`Governança (${this.governanceProgress}%)`);
    return reasons.join(', ');
  }

  navigateToSimulation() {
    this.router.navigate(['simulation']);
  }

  verifyPossibility(symbol: string) {
    this.spinnerService.show();

    this.contractedPlanService
      .getByUser()
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
      )
      .subscribe({
        next: (data) => {
          if (!data.verify) {
            this.modalService.open(ScoreWarningComponent, {
              centered: true,
              size: 'sm',
            });
          } else {
            this.router.navigate([
              '/logged/assesment/questionary',
              this.sectionId,
              symbol,
              this.segmentId,
            ]);
          }
        },
        error: (error) => {
          if (error.error.errors.includes('Contrate um plano')) {
            this.toastr.warning(
              'Contrate um plano antes de iniciar avaliação!',
              'Atenção',
              { progressBar: true },
            );
            this.router.navigate(['/logged/plans']);
          }
        },
      });
  }

  verifyPossibilityComponentTest(symbol: string) {
    this.router.navigate(['/logged/assesment/test-formcomponent']);
  }

  close() {
    this.modalService.dismissAll();
  }

  getSymbolCompanySection() {}
}
