import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-terms-and-conditions-modal',
  templateUrl: './terms-and-conditions-modal.component.html',
  styleUrls: ['./terms-and-conditions-modal.component.scss']
})
export class TermsAndConditionsModalComponent {

  constructor(
    private modalService: NgbModal
  ) {}

  closeModal() {
    this.modalService.dismissAll();
  }

}
