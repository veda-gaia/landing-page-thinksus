import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ImprovementsComponent } from './improvements.component';
import { CompanyService } from 'src/app/services/company.service';
import { EsgRatingService } from 'src/app/services/esg-rating.service';
import { AiSuggestionService } from 'src/app/services/ai-suggestion.service';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';

describe('ImprovementsComponent', () => {
  let component: ImprovementsComponent;
  let fixture: ComponentFixture<ImprovementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImprovementsComponent],
      // O template usa <markdown>, <ngx-spinner> e pipes de traducao; o alvo
      // aqui e a logica de agrupamento, nao a renderizacao.
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: CompanyService, useValue: { getByUser: () => of({}) } },
        { provide: EsgRatingService, useValue: { getById: () => of({}) } },
        { provide: AiSuggestionService, useValue: { getByRating: () => of([]) } },
        {
          provide: TranslateService,
          useValue: { currentLang: 'pt', onLangChange: of({}), get: () => of('') },
        },
        { provide: NgxSpinnerService, useValue: { show: () => {}, hide: () => {} } },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => 'rating-id' } } },
        },
      ],
    });
    fixture = TestBed.createComponent(ImprovementsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('agrupamento por area (contrato por area, sem questionId)', () => {
    /** Acessa o metodo privado sem depender do fluxo HTTP. */
    const agrupar = (comp: any, sugestoes: any[]) => {
      comp.suggestionsGrouped = {};
      for (let i = 1; i <= 12; i++) comp.suggestionsGrouped[i] = [];
      for (const sug of sugestoes) {
        const index = comp.accordionIndexForAreaCode(sug.area);
        if (index && comp.suggestionsGrouped[index]) {
          comp.suggestionsGrouped[index].push(sug);
        }
      }
    };

    it('usa sug.area direto, sem procurar a resposta pelo questionId', () => {
      const c: any = component;
      const nature = { _id: '1', area: 'Nature', text: { pt: 'a' } };
      const risk = { _id: '2', area: 'Risk', text: { pt: 'b' } };

      agrupar(c, [nature, risk]);

      const todos = Object.values(c.suggestionsGrouped).flat();
      expect(todos).toContain(nature);
      expect(todos).toContain(risk);
    });

    it('coloca a area no bloco do pilar correspondente', () => {
      const c: any = component;

      expect(c.accordionIndexForAreaCode('Nature')).toBeGreaterThanOrEqual(1);
      expect(c.accordionIndexForAreaCode('Nature')).toBeLessThanOrEqual(4);
      expect(c.accordionIndexForAreaCode('Fair_Work')).toBeGreaterThanOrEqual(5);
      expect(c.accordionIndexForAreaCode('Fair_Work')).toBeLessThanOrEqual(8);
      expect(c.accordionIndexForAreaCode('Risk')).toBeGreaterThanOrEqual(9);
      expect(c.accordionIndexForAreaCode('Risk')).toBeLessThanOrEqual(12);
    });

    it('ignora area desconhecida sem quebrar a tela', () => {
      const c: any = component;

      expect(c.accordionIndexForAreaCode('Area_Que_Nao_Existe')).toBeNull();
      expect(() => agrupar(c, [{ _id: '3', area: 'Area_Que_Nao_Existe' }])).not.toThrow();
    });

    it('area sem sugestao fica vazia, mantendo o empty state', () => {
      const c: any = component;

      agrupar(c, [{ _id: '1', area: 'Nature', text: { pt: 'a' } }]);

      const vazias = Object.values(c.suggestionsGrouped).filter(
        (g: any) => g.length === 0,
      );
      expect(vazias.length).toBe(11);
    });
  });
});
