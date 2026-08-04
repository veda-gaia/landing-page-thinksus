import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';

import { AssessmentQuestionnaireComponent } from './assessment-questionnaire.component';
import { EsgRatingService } from 'src/app/services/esg-rating.service';
import { CompanyService } from 'src/app/services/company.service';
import { AwsService } from 'src/app/services/aws.service';
import { EsgFormService } from 'src/app/services/esg-form.service';

describe('AssessmentQuestionnaireComponent', () => {
  let component: AssessmentQuestionnaireComponent;
  let fixture: ComponentFixture<AssessmentQuestionnaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TranslateModule.forRoot()],
      declarations: [AssessmentQuestionnaireComponent],
      providers: [
        { provide: Router, useValue: { navigate: () => {} } },
        { provide: NgbModal, useValue: {} },
        { provide: EsgRatingService, useValue: { list: () => of([]), register: () => of({}) } },
        { provide: CompanyService, useValue: { getByUser: () => of({}) } },
        { provide: ToastrService, useValue: { error: () => {} } },
        { provide: NgxSpinnerService, useValue: { show: () => {}, hide: () => {} } },
        { provide: AwsService, useValue: {} },
        {
          provide: EsgFormService,
          useValue: { getbySectionSegment: () => of({ questions: [] }) },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({ sectionId: 'sec-1', symbolId: 'e', segmentId: 'seg-1' }) },
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(AssessmentQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'exige documento quando a resposta bate com o `type` real da questão ' +
      '(regra confirmada na Sprint 5.0, card c345217b) — cobertura do único ' +
      'componente de questionário efetivamente roteado no app',
    () => {
      // control.value aqui é um FormGroup ({questionId, answer}), diferente
      // dos antigos componentes por setor (já removidos por serem código
      // morto — nenhuma navegação no app chegava neles).
      component.questionaryData = [
        { _id: 'q1', documentNeeded: true, type: 'No' } as any,
        { _id: 'q2', documentNeeded: true, type: 'Yes' } as any,
      ];
      component.formArray.push(
        new FormGroup({
          questionId: new FormControl('q1'),
          answer: new FormControl('No', Validators.required),
        }),
      );
      component.formArray.push(
        new FormGroup({
          questionId: new FormControl('q2'),
          answer: new FormControl('No', Validators.required),
        }),
      );

      component.submitRevision();

      // q1: resposta 'No' bate com type 'No' -> documento exigido
      expect(
        component.formArrayDocuments.at(0).hasValidator(Validators.required),
      ).toBe(true);
      // q2: resposta 'No' não bate com type 'Yes' -> documento não exigido
      expect(
        component.formArrayDocuments.at(1).hasValidator(Validators.required),
      ).toBe(false);
    },
  );
});
