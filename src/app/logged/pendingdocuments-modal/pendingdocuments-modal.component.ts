import { Component, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pendingdocuments-modal',
  templateUrl: './pendingdocuments-modal.component.html',
  styleUrls: ['./pendingdocuments-modal.component.scss'],
})
export class PendingDocumentsModalComponent {
  @Output() accepted = new EventEmitter<boolean>();

  constructor(private modalService: NgbModal) {}

  accept() {
    this.modalService.dismissAll();
    this.accepted.emit(true);
  }

  exit() {
    this.modalService.dismissAll();
    this.accepted.emit(false);
  }
}
