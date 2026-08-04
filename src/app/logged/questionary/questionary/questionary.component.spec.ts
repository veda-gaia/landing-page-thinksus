import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';

import { QuestionaryComponent } from './questionary.component';
import { EsgRatingService } from 'src/app/services/esg-rating.service';
import { CompanyService } from 'src/app/services/company.service';
import { AwsService } from 'src/app/services/aws.service';
import { EsgFormService } from 'src/app/services/esg-form.service';

describe('QuestionaryComponent', () => {
  let component: QuestionaryComponent;
  let fixture: ComponentFixture<QuestionaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TranslateModule.forRoot()],
      declarations: [QuestionaryComponent],
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
    fixture = TestBed.createComponent(QuestionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
