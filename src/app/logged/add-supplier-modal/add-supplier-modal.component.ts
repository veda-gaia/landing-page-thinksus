import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { CompanyRevenueEnum } from 'src/app/enums/company-revenue.enum';
import { UserSupplierRegisterDto } from 'src/app/interfaces/user/user-supplier-register-request.dto';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-supplier-modal',
  templateUrl: './add-supplier-modal.component.html',
  styleUrls: ['./add-supplier-modal.component.scss'],
})
export class AddSupplierModalComponent implements OnInit {
  @Output() submitted = new EventEmitter<boolean>();
  form: FormGroup;
  CompanyRevenueEnum = CompanyRevenueEnum;
  selectedLanguage: string = '';

  @Input() userSupplerId?: string;

  constructor(
    private modalService: NgbActiveModal,
    private fb: FormBuilder,
    private userService: UserService,
    private translateService: TranslateService,
    private companyService: CompanyService,
    private spinnerService: NgxSpinnerService
  ) {
    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      document: ['', Validators.required],
      email: ['', Validators.required],
      buyValue: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.selectedLanguage = this.translateService.currentLang;

    if (this.userSupplerId) {
      this.spinnerService.show();
      this.companyService
        .getById(this.userSupplerId)
        .pipe(
          finalize(() => {
            this.spinnerService.hide();
          })
        )
        .subscribe({
          next: (company) => {
            this.form.patchValue({
              id: company._id,
              name: company.company,
              document: company.cnpj,
              email: company.user.email,
              buyValue: company.buyValue,
            });
          },
          error: (err) => {
            alert('Erro ao carregar os dados do usuário.');
            this.modalService.close('updated');
          },
        });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const formValue = this.form.value;

    const dto: UserSupplierRegisterDto = {
      companyId: formValue.id,
      cnpj: formValue.document,
      name: formValue.name,
      email: formValue.email,
      buyValue: formValue.buyValue,
    };

    if (dto.companyId == null) {
      this.userService
        .registerSupplier(dto)
        .pipe(
          finalize(() => {
            this.spinnerService.hide();
          })
        )
        .subscribe({
          next: () => this.modalService.close('updated'),
          error: (err) => {
            console.error('Erro ao registrar supplier', err);
            this.modalService.close('error');
          },
        });
    } else {
      this.userService.updateUserSupplier(dto.companyId, dto).subscribe({
        next: () => this.modalService.close('updated'),
        error: (err) => {
          console.error('Erro ao atualizar supplier', err);
          this.modalService.close('error');
        },
      });
    }

    this.submitted.emit(true);
  }

  exit() {
    this.modalService.close();
    this.submitted.emit(false);
  }
}
