import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentOrientationModalComponent } from './payment-orientation-modal/payment-orientation-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent {
  constructor(
    private modalService: NgbModal,
    private router: Router,
  ) {

  }

  goToPlan(planLink: string) {
    // Abre o modal do formulário
    const modalRef = this.modalService.open(PaymentOrientationModalComponent, {centered: true});

    // Se inscreve no status do modal
    modalRef.componentInstance.submitted.subscribe((next: boolean) => {
      if (next) {
        console.log(planLink)
        
        this.router.navigate([planLink])
      }
    });
  }
}
