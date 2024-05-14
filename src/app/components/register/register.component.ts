import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CepService } from 'src/app/services/cep.service';
import { countryList } from 'src/app/util/country';
import { enSectorList } from 'src/app/util/en-sector';
import { enAgribusinessList, enIndustryList, enServicesList } from 'src/app/util/en-segment';
import { ptSectorList } from 'src/app/util/pt-sector';
import { ptAgribusinessList, ptIndustryList, ptServicesList } from 'src/app/util/pt-segment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  actualStep = 1
  keepReading = false
  showPassword = false
  
  form1: FormGroup
  form2: FormGroup
  form3: FormGroup

  countryList = countryList
  sectorList: string[] = []
  segmentList: string[] = []

  constructor(
    private fb: FormBuilder,
    private cepService: CepService,
    private translateService: TranslateService,
  ) {
    this.form1 = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
    })

    this.form2 = this.fb.group({
      enterpriseName: ['', Validators.required],
      country: ['Brasil', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: [''],
      document: [''],
      sector: ['', Validators.required],
      segment: ['', Validators.required],
    })

    this.form3 = this.fb.group({
      collaboratorsAmmount: ['1.000-5.000', Validators.required],
      invoicing: ['above-50.000', Validators.required],
    })
  }

  ngOnInit() {
    this.scrollToTop()

    // Subscribe Zip Code / CEP
    this.form2.controls['zipCode'].valueChanges.subscribe({
      next: (data) => {
        if(data.length === 8) {
          this.cepService.getBrazilCepInfo(data).subscribe({
            next: (data) => {
              this.form2.controls['state'].setValue(data.uf)
              this.form2.controls['city'].setValue(data.localidade)
            }
          })
        }
      }
    })

    const currentLang = this.translateService.currentLang
    if(currentLang === 'en') {
      this.sectorList = enSectorList
    } else {
      this.sectorList = ptSectorList
    }

    // Subscribe Language
    this.translateService.onLangChange.subscribe({
      next: (data: any) => {
        if(data.lang === 'en') {
          this.sectorList = enSectorList
        } else {
          this.sectorList = ptSectorList
        }

        this.handleSegment(this.form2.controls['sector'].value)
      }
    })
    
    // Subscribe Sector
    this.form2.controls['sector'].valueChanges.subscribe({
      next: (data) => {
        this.handleSegment(data)
      }
    })
  }

  handleSegment(data: any) {
    const currentLang = this.translateService.currentLang

    if(data === 'Agronegócio' || data === 'Agribusiness') {
      if(currentLang === 'en') {
        this.segmentList = enAgribusinessList
      } else this.segmentList = ptAgribusinessList

      return
    }

    if(data === 'Indústria' || data === 'Industry') {
      if(currentLang === 'en') {
        this.segmentList = enIndustryList
      } else this.segmentList = ptIndustryList
      
      return
    }

    if(data === 'Serviços' || data === 'Services') {
      if(currentLang === 'en') {
        this.segmentList = enServicesList
      } else this.segmentList = ptServicesList
      
      return
    }
  }

  onSubmitStep1() {
    if(this.form1.invalid) return

    this.actualStep = 2
  }

  onSubmitStep2() {
    if(this.form2.invalid) return

    this.actualStep = 3
  }

  onSubmitStep3() {
    if(this.form3.invalid) return

    this.actualStep = 4
  }

  onSubmitStep4() {
    this.actualStep = 5
  }

  stepBack() {
    this.actualStep = this.actualStep - 1
  }

  get email() {
    return this.form1.controls['email'] as FormControl
  }

  get name() {
    return this.form1.controls['name'] as FormControl
  }

  get country() {
    return this.form2.controls['country'] as FormControl
  }

  get document() {
    return this.form2.controls['document'] as FormControl
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
