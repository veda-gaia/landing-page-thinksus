import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CompanyEmployeesEnum } from 'src/app/enums/company-employees.enum';
import { CompanyRevenueEnum } from 'src/app/enums/company-revenue.enum';
import { CompanySectionEnum } from 'src/app/enums/company-section.enum';
import { CompanySegmentEnum } from 'src/app/enums/company-segment.enum';
import { LoginInterface } from 'src/app/interfaces/authentication/authentication.interface';
import { UserRegisterRequestDto } from 'src/app/interfaces/user/user-register-request.dto';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CepService } from 'src/app/services/cep.service';
import { UserService } from 'src/app/services/user.service';
import { countryListEn, countryListPt } from 'src/app/util/country';
import { enSectorList } from 'src/app/util/en-sector';
import {
  SegmentList,
  enAgribusinessList,
  enIndustryList,
  enServicesList,
} from 'src/app/util/en-segment';
import { SectorList, ptSectorList } from 'src/app/util/pt-sector';
import {
  ptAgribusinessList,
  ptIndustryList,
  ptServicesList,
} from 'src/app/util/pt-segment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  actualStep = 1;
  keepReading = false;
  showPassword = false;
  companyEmployeesEnum = CompanyEmployeesEnum;

  code = new FormControl('', [Validators.required, Validators.minLength(6)]);

  form1;
  form2;
  form3;

  countryList: any[] = [];
  sectorList: SectorList[] = [];
  segmentList: SegmentList[] = [];

  CompanyRevenueEnum = CompanyRevenueEnum

  constructor(
    private fb: FormBuilder,
    private cepService: CepService,
    private translateService: TranslateService,
    private userService: UserService,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.form1 = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
    });

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

    const currentLang = this.translateService.currentLang;
    if (currentLang === 'en') {
      this.sectorList = enSectorList;
      this.countryList = countryListEn
    } else {
      this.sectorList = ptSectorList;
      this.countryList = countryListPt
    }

    // Subscribe Language
    this.translateService.onLangChange.subscribe({
      next: (data: any) => {
        if (data.lang === 'en') {
          this.sectorList = enSectorList;
          this.countryList = countryListEn
        } else {
          this.sectorList = ptSectorList;
          this.countryList = countryListPt
        }

        this.handleSegment(this.form2.controls.sector.value);
      },
    });

    // Subscribe Sector
    this.form2.controls.sector.valueChanges.subscribe({
      next: (data) => {
        if (!data) return;
        this.handleSegment(data);
      },
    });
  }

  handleSegment(data: any) {
    const currentLang = this.translateService.currentLang;

    if (data === CompanySectionEnum.Agribusiness) {
      if (currentLang === 'en') {
        this.segmentList = enAgribusinessList;
      } else this.segmentList = ptAgribusinessList;

      return;
    }

    if (data === CompanySectionEnum.Industry) {
      if (currentLang === 'en') {
        this.segmentList = enIndustryList;
      } else this.segmentList = ptIndustryList;

      return;
    }

    if (data === CompanySectionEnum.Services) {
      if (currentLang === 'en') {
        this.segmentList = enServicesList;
      } else this.segmentList = ptServicesList;

      return;
    }
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
        segment: this.form2.controls['segment'].value as CompanySegmentEnum,
        section: this.form2.controls['sector'].value as CompanySectionEnum,
        numberEmployees: this.form3.controls['collaboratorsAmmount']
          .value as CompanyEmployeesEnum,
        revenue: this.form3.controls['invoicing'].value as CompanyRevenueEnum
      },
      user: {
        name: this.name.value,
        email: this.email.value.toLowerCase(),
        password: this.form1.controls['password'].value as string,
        phone: this.form1.controls['phone'].value as string,
        positionRole: this.form1.controls['role'].value as string,
      },
    };

    this.userService.register(dto).subscribe({
      next: (data) => {
        console.log(data);
        this.actualStep = 4;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Erro ao cadastrar usuário/empresa', 'Erro', {progressBar: true});
        this.toastr.error(err.error.errors, 'Error', {progressBar: true});
      },
    });
  }

  onSubmitStep4() {
    if (this.code.invalid || !this.code.value) return;
    this.userService.activeUser({email: this.email.value, code: +this.code.value}).subscribe({
      next: (data) => {
        console.log(data);
        this.actualStep = 5;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error(err.error.errors, 'Error', {progressBar: true});
      },
    });
  }

  loginAndEnter() {
    const dto: LoginInterface = {
      email: this.form1.controls['email'].value ? this.form1.controls['email'].value : '',
      password: this.form1.controls['password'].value ? this.form1.controls['password'].value : ''
    }

    this.authService.login(dto).subscribe({
      next: (data) => {
        this.authService.setAuthUser(data);
        this.router.navigate(['/logged'])
      }
    })
  }

  stepBack() {
    this.actualStep = this.actualStep - 1;
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
}
