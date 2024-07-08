import { Component, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {
  @Output() accepted = new EventEmitter<boolean>();

  constructor(
    private modalService: NgbModal,
  ) { }

  accept() {
    this.modalService.dismissAll();
    this.accepted.emit(true);
  }

  exit() {
    this.modalService.dismissAll();
    this.accepted.emit(false);
  }
}
