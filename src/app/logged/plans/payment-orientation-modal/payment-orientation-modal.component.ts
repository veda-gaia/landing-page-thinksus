import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-payment-orientation-modal',
  templateUrl: './payment-orientation-modal.component.html',
  styleUrls: ['./payment-orientation-modal.component.scss']
})
export class PaymentOrientationModalComponent {
  @Output() submitted = new EventEmitter<boolean>();
  
  constructor(
    private modalService: NgbModal,
  ) {
  }

  next() {
    this.modalService.dismissAll();
    this.submitted.emit(true);
  }

  exit() {
    this.modalService.dismissAll();
    this.submitted.emit(false);
  }
}
