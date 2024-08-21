import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  myContractsList: any[] = []
  
  showEditForm = false
  editForm: FormGroup
  
  loading = true
  user: any
  company: any

  selectedEditInputs: string[] = []

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private companyService: CompanyService,
  ) {
    this.editForm = this.fb.group({
      fullName: ['', Validators.required],
      companyName: ['', Validators.required],
      section: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit() {
    let userLocal: any = localStorage.getItem('user')
    if(userLocal) {
      userLocal = JSON.parse(userLocal)

      this.userService.getById(userLocal.id).subscribe({
        next: (data) => {
          this.user = data
          this.loading = false
          console.log(data)

          this.editForm.controls['fullName'].setValue(data.name)
          this.editForm.controls['email'].setValue(data.email)
        }
      })

      this.companyService.getByUser().subscribe({
        next: (data) => {
          this.company = data
          this.loading = false
          console.log(data)

          this.editForm.controls['companyName'].setValue(data.company)
          this.editForm.controls['section'].setValue(data.section)

          if( data.companyAdress.country ) this.editForm.controls['country'].setValue(data.companyAdress.country)
        }
      })


    }

    // Mock
    // this.myContractsList = [
    //   {
    //     name: "Certificado Ouro",
    //     company: "ColabX",
    //     emissionDate: "28/08/2023",
    //   },
    //   {
    //     name: "Certificado Prata",
    //     company: "ColabX",
    //     emissionDate: "28/08/2022",
    //   },
    //   {
    //     name: "Certificado Bronze",
    //     company: "ColabX",
    //     emissionDate: "28/08/2021",
    //   },
    // ]
  }

  addEditInput(input: string) {
    this.selectedEditInputs.push(input)
  }
}
