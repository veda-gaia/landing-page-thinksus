import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { UserUpdateRequestDto } from 'src/app/dtos/user-update-request.dto';
import { UserInterface } from 'src/app/interfaces/user/user.interface';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';
import { comparePassword } from 'src/app/util/validators.util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  myContractsList: any[] = [];

  showEditForm = false;
  editForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  showOldPassword = false;

  loading = true;
  user!: UserInterface;
  company: any;

  selectedEditInputs: string[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private companyService: CompanyService,
    private spinnerService: NgxSpinnerService
  ) {
    this.editForm = this.fb.group({
      fullName: ['', Validators.required],
      companyName: ['', Validators.required],
      section: ['', Validators.required],
      // country: ['', Validators.required],
      email: ['', Validators.required],
      oldPassword: ['', ],
      password: ['', ],
      confirmPassword: ['', ],
    },{
      validators:comparePassword('password','confirmPassword')
    }
    );
  }

  ngOnInit() {
    this.userService.$user.subscribe({
      next: (data) => {
        if(!data) return;
        this.user = data;
        this.loading = false;

        this.editForm.controls['fullName'].setValue(data.name);
        this.editForm.controls['email'].setValue(data.email);
      },
    });
    this.spinnerService.show();
    this.companyService.getByUser().pipe(
      finalize(() => {
        this.spinnerService.hide()
      })
    ).subscribe({
      next: (data) => {
        this.company = data;
        this.loading = false;

        this.editForm.controls['companyName'].setValue(data.company);
        this.editForm.controls['section'].setValue(data.section);
      },
    });

    this.editForm.get('password')?.valueChanges.subscribe(() => {
      this.onPasswordChanged();
    });
  }

  addEditInput(input: string) {
    this.selectedEditInputs.push(input);
  }

  subimt() {
    const dto: UserUpdateRequestDto = {
      name: this.editForm.controls['fullName'].value,
      email: this.editForm.controls['email'].value,
      company: this.editForm.controls['companyName'].value,
      oldPassword: this.editForm.controls['oldPassword'].value,
      password: this.editForm.controls['password'].value,
      section: this.editForm.controls['section'].value,
    };

    for(const key in dto) {
      //@ts-ignore
      if(!dto[key]) delete dto[key];
    }
    this.spinnerService.show()

    this.userService.update(this.user._id, dto).pipe(
      finalize(() => {
        this.spinnerService.hide()
      })
    ).subscribe({
      next: (data) => {
        this.userService.refreshUser();
        this.showEditForm = false;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

    onPasswordChanged(): void {
      const password = this.editForm.get('password')?.value;

      if (password) {
        this.editForm.get('password')?.setValidators(Validators.required);
        this.editForm.get('oldPassword')?.setValidators(Validators.required);
        this.editForm.get('confirmPassword')?.setValidators(Validators.required);
      } else {
        this.editForm.get('oldPassword')?.clearValidators();
        this.editForm.get('confirmPassword')?.clearValidators();
        this.editForm.get('password')?.setValidators(Validators.required);
      }

      this.editForm.get('oldPassword')?.updateValueAndValidity();
      this.editForm.get('confirmPassword')?.updateValueAndValidity();
      this.editForm.get('password')?.setValidators(Validators.required);
  }
}
