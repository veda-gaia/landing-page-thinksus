import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-supplier-modal',
  templateUrl: './add-supplier-modal.component.html',
  styleUrls: ['./add-supplier-modal.component.scss']
})
export class AddSupplierModalComponent {
  @Output() submitted = new EventEmitter<boolean>();
  form: FormGroup

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      document: ['', Validators.required],
      email: ['', Validators.required],
      buyValue: ['', Validators.required],
    })
  }

  onSubmit() {
    if(this.form.invalid) return

    this.modalService.dismissAll();
    this.submitted.emit(true);
  }

  exit() {
    this.modalService.dismissAll();
    this.submitted.emit(false);
  }
}
