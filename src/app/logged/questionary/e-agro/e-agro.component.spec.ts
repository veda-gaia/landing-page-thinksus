import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { EAgroComponent } from './e-agro.component';
import { EsgRatingService } from 'src/app/services/esg-rating.service';
import { CompanyService } from 'src/app/services/company.service';

describe('EAgroComponent — BUG REPRODUCER (Sprint 5.0, card c345217b)', () => {
  let component: EAgroComponent;
  let fixture: ComponentFixture<EAgroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TranslateModule.forRoot()],
      declarations: [EAgroComponent],
      providers: [
        { provide: Router, useValue: { navigate: () => {} } },
        { provide: NgbModal, useValue: {} },
        {
          provide: EsgRatingService,
          useValue: { list: () => of([]), register: () => of({}) },
        },
        {
          // getByUser() dispara em memória no construtor, precisa retornar
          // algo pra não quebrar antes de chegar no que queremos testar.
          provide: CompanyService,
          useValue: { getByUser: () => of({ _id: 'company-1', section: 'Agribusiness' }) },
        },
        { provide: ToastrService, useValue: { error: () => {} } },
        { provide: NgxSpinnerService, useValue: { show: () => {}, hide: () => {} } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(EAgroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'CORRIGIDO: exige documento com base no `type` real da questão, ' +
      'não mais numa string "Yes" hardcoded',
    () => {
      // E7 tem type: 'No' de verdade (thinksus-api/src/shared/utils/answer-data.ts)
      // — "No" é a resposta que PONTUA pra essa questão específica.
      const e7Index = component.questionaryData.findIndex((q) => q.id === 'E7');
      expect(component.questionaryData[e7Index].documentNeeded).toBe(true);
      expect(component.questionaryData[e7Index].type).toBe('No');

      component.formArray.controls.forEach((control, index) => {
        control.setValue(index === e7Index ? 'No' : 'Not apply');
      });

      component.submitRevision();

      // Documento agora É exigido quando a resposta bate com o `type` real
      // da questão (a resposta que pontua), não mais só quando é 'Yes'.
      const documentControl = component.formArrayDocuments.at(e7Index);
      expect(documentControl.hasValidator(Validators.required)).toBe(true);
      expect(documentControl.valid).toBe(false); // vazio e obrigatório = inválido
    },
  );

  it('não exige documento quando a resposta NÃO bate com o `type` que pontua', () => {
    // E1 tem type: 'Yes'. Respondendo 'No' (resposta que NÃO pontua pra E1),
    // documento não deve ser exigido.
    const e1Index = component.questionaryData.findIndex((q) => q.id === 'E1');
    expect(component.questionaryData[e1Index].type).toBe('Yes');

    component.formArray.controls.forEach((control, index) => {
      control.setValue(index === e1Index ? 'No' : 'Not apply');
    });

    component.submitRevision();

    const documentControl = component.formArrayDocuments.at(e1Index);
    expect(documentControl.hasValidator(Validators.required)).toBe(false);
  });
});
