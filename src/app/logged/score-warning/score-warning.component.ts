import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-score-warning',
  templateUrl: './score-warning.component.html',
  styleUrls: ['./score-warning.component.scss']
})
export class ScoreWarningComponent {

  constructor(
    private modalService: NgbModal
  ) {}

  close() {
    this.modalService.dismissAll();
  }

}
