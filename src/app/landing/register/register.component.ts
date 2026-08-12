import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CompanyEmployeesEnum } from 'src/app/enums/company-employees.enum';
import { CompanyRevenueEnum } from 'src/app/enums/company-revenue.enum';
import { LoginInterface } from 'src/app/interfaces/authentication/authentication.interface';
import { UserRegisterRequestDto } from 'src/app/interfaces/user/user-register-request.dto';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CepService } from 'src/app/services/cep.service';
import { UserService } from 'src/app/services/user.service';
import { countryListEn, countryListPt } from 'src/app/util/country';
import { TermsAndConditionsModalComponent } from './terms-and-conditions-modal/terms-and-conditions-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, Observable, tap } from 'rxjs';
import { comparePassword } from 'src/app/util/validators.util';
import { CompanyService } from 'src/app/services/company.service';
import { SectionInterface } from 'src/app/forms/section.interface';
import { SegmentInterface } from 'src/app/forms/segment.interface';
import { SectionService } from 'src/app/services/sections.service';
import { SegmentService } from 'src/app/services/segment.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  actualStep = 1;
  keepReading = false;
  showPassword = false;
  showConfirmPassword = false;
  companyEmployeesEnum = CompanyEmployeesEnum;

  code = new FormControl('', [Validators.required, Validators.minLength(6)]);

  form1;
  form2;
  form3;

  countryList: any[] = [];
  // Entidades vindas do banco (ADR-0033), nao mais listas hardcoded.
  sectorList: any[] = [];
  segmentList: any[] = [];
  currentLang: string = '';

  CompanyRevenueEnum = CompanyRevenueEnum;

  userCompanyId: string = '';
  sections$!: Observable<SectionInterface[]>;
  segments$!: Observable<SegmentInterface[]>;

  constructor(
    private fb: FormBuilder,
    private cepService: CepService,
    private translateService: TranslateService,
    private userService: UserService,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal,
    private spinnerService: NgxSpinnerService,
    private ChangeDetectorRef: ChangeDetectorRef,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private _sectionService: SectionService,
    private _segmentService: SegmentService
  ) {
    this.form1 = this.fb.group(
      {
        id: [''],
        name: ['', Validators.required],
        email: ['', Validators.required],
        phone: ['', Validators.required],
        role: ['', Validators.required],
        password: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
        confirmPassword: [''],
      },
      {
        validators: comparePassword('password', 'confirmPassword'),
      }
    );

    this.form2 = this.fb.group({
      enterpriseName: ['', Validators.required],
      country: ['Brazil', Validators.required],
      state: [''],
      city: [''],
      zipCode: [''],
      document: [''],
      sector: ['', Validators.required],
      segment: ['', Validators.required],
    });

    this.form3 = this.fb.group({
      collaboratorsAmmount: [''],
      invoicing: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.scrollToTop();

    this.form2.controls.zipCode.valueChanges.subscribe({
      next: (data) => {
        if (data && data.length === 8) {
          this.cepService.getBrazilCepInfo(data).subscribe({
            next: (data) => {
              this.form2.controls['state'].setValue(data.uf);
              this.form2.controls['city'].setValue(data.localidade);
            },
          });
        }
      },
    });

    this.form2.controls.sector.valueChanges.subscribe({
      next: (data) => {
        this.segments$ = this._segmentService.getbySection('0', data ?? '');
      },
    });

    this.currentLang = this.translateService.currentLang;
    // Setores vem do banco (ADR-0033): as listas pt/en hardcoded so
    // conheciam Agribusiness, Industry e Services, entao Cannabis nunca
    // aparecia no cadastro. O nome ja vem da entidade, sem traducao local.
    this._sectionService.list().subscribe({
      next: (sections) => (this.sectorList = sections || []),
      error: () => (this.sectorList = []),
    });

    if (this.currentLang === 'en') {
      this.countryList = countryListEn;
    } else {
      this.countryList = countryListPt;
    }

    // Subscribe Language
    this.translateService.onLangChange.subscribe({
      next: (data: any) => {
        this.currentLang = this.translateService.currentLang;
        // O setor nao troca com o idioma: o nome vem da entidade. Antes cada
        // troca de lingua reescrevia a lista com as tres opcoes hardcoded.
        if (data.lang === 'en') {
          this.countryList = countryListEn;
        } else {
          this.countryList = countryListPt;
        }

        this.ChangeDetectorRef.detectChanges();
        this.handleSegment(this.form2.controls.sector.value);
      },
    });

    this.route.queryParams.subscribe((params) => {
      this.userCompanyId = params['id'];
    });

    if (this.userCompanyId) {
      this.companyService.getByUser(this.userCompanyId).subscribe({
        next: (company) => {
          this.form1.patchValue({
            id: company.user._id,
            email: company.user.email,
          });

          this.form2.patchValue({
            document: company.cnpj,
            enterpriseName: company.company,
          });

          if (company.user._id) {
            this.form1.get('email')?.disable();
          } else {
            this.form1.get('email')?.enable();
          }
        },
        error: (err) => {
          alert('Erro ao carregar os dados do usuário.');
        },
      });
    }

    this.loadSection();
  }

  /**
   * Carrega os segmentos do setor escolhido (ADR-0033).
   *
   * Antes isto era um switch sobre CompanySectionEnum que escolhia entre seis
   * listas hardcoded (pt/en x Agribusiness/Industry/Services). Qualquer setor
   * fora desses tres — Cannabis, por exemplo — caia em nenhum branch e o
   * cliente ficava com o select de segmento vazio, sem erro.
   */
  handleSegment(sectionId: any) {
    this.segmentList = [];
    this.form2.controls['segment']?.setValue(null);

    if (!sectionId) return;

    this._segmentService.list().subscribe({
      next: (segmentos) => {
        this.segmentList = (segmentos || []).filter(
          (seg: any) =>
            String(seg?.section?._id ?? seg?.section) === String(sectionId),
        ) as any;
      },
      error: () => {
        this.segmentList = [];
      },
    });
  }

  onSubmitStep1() {
    if (this.form1.invalid) return;

    this.actualStep = 2;
  }

  onSubmitStep2() {
    if (this.form2.invalid) return;

    this.actualStep = 3;
  }

  onSubmitStep3() {
    if (this.form3.invalid) return;

    const dto: UserRegisterRequestDto = {
      company: {
        cnpj: this.form2.controls['document'].value as string,
        company: this.form2.controls['enterpriseName'].value as string,
        companyAdress: {
          country: this.form2.controls['country'].value as string,
          state: this.form2.controls['state'].value as string,
          city: this.form2.controls['city'].value as string,
          zipCode: this.form2.controls['zipCode'].value as string,
        },
        // Ids das entidades; a API valida existencia e o vinculo entre elas.
        segment: this.form2.controls['segment'].value as any,
        section: this.form2.controls['sector'].value as any,
        numberEmployees: this.form3.controls['collaboratorsAmmount']
          .value as CompanyEmployeesEnum,
        revenue: this.form3.controls['invoicing'].value as CompanyRevenueEnum,
      },
      user: {
        id: this.userId.value,
        name: this.name.value,
        email: this.email.value.toLowerCase(),
        password: this.form1.controls['password'].value as string,
        phone: this.form1.controls['phone'].value as string,
        positionRole: this.form1.controls['role'].value as string,
      },
      lang: this.translateService.currentLang,
    };

    this.spinnerService.show();
    this.userService
      .register(dto)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        })
      )
      .subscribe({
        next: (data) => {
          this.actualStep = 4;
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Erro ao cadastrar usuário/empresa', 'Erro', {
            progressBar: true,
          });
          if (
            err.error.errors.includes('cnpj') &&
            err.error.errors.includes('dup key')
          ) {
            this.toastr.error(
              'Já existe uma empresa cadastrada com o CNPJ informado',
              'Erro',
              { progressBar: true }
            );
          }
        },
      });
  }

  onSubmitStep4() {
    if (this.code.invalid || !this.code.value) return;
    this.spinnerService.show();
    this.userService
      .activeUser({ email: this.email.value, code: +this.code.value })
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        })
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          this.actualStep = 5;
        },
        error: (err) => {
          console.error(err);
          this.toastr.error(err.error.errors, 'Error', { progressBar: true });
        },
      });
  }

  loginAndEnter() {
    const dto: LoginInterface = {
      email: this.form1.controls['email'].value
        ? this.form1.controls['email'].value
        : '',
      password: this.form1.controls['password'].value
        ? this.form1.controls['password'].value
        : '',
    };
    this.spinnerService.show();
    this.authService
      .login(dto)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        })
      )
      .subscribe({
        next: (data) => {
          this.authService.setAuthUser(data);
          this.router.navigate(['/logged']);
        },
      });
  }

  stepBack() {
    this.actualStep = this.actualStep - 1;
  }

  get userId() {
    return this.form1.controls['id'] as FormControl;
  }

  get email() {
    return this.form1.controls['email'] as FormControl;
  }

  get name() {
    return this.form1.controls['name'] as FormControl;
  }

  get country() {
    return this.form2.controls['country'] as FormControl;
  }

  get document() {
    return this.form2.controls['document'] as FormControl;
  }

  get state() {
    return this.form2.controls['state'] as FormControl;
  }

  get city() {
    return this.form2.controls['city'] as FormControl;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openPdf() {
    this.modalService.open(TermsAndConditionsModalComponent);
  }

  loadSection() {
    this.sections$ = this._sectionService.list();
  }

  loadSegment() {
    const esgFormValues = this.form2.value;
    //this.spinnerService.show();

    this.segments$ = this._segmentService
      .getbySection('', esgFormValues.sector?.toString() ?? '')
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        })
      );
  }
}
