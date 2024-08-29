import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentOrientationModalComponent } from './payment-orientation-modal/payment-orientation-modal.component';
import { Router } from '@angular/router';
import { SubscriptionService } from '../../services/subscription.service';
import SubscriptionInterface from '../../interfaces/subscription/subscription.interface';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent {
  subscriptions: SubscriptionInterface[] = [];

  subscriptionsSimulation:SubscriptionInterface | undefined = undefined;
  subscriptionsSolution:SubscriptionInterface | undefined = undefined;
  subscriptionsSupplyChain:SubscriptionInterface | undefined = undefined;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private subscriptionService: SubscriptionService,
    private toastr: ToastrService,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinnerService.show()
    this.subscriptionService.list().pipe(
      finalize(() => {
        this.spinnerService.hide()
      })
    ).subscribe({
      next: (data) => {
        this.subscriptions = data;
        this.subscriptionsSimulation = data.find(subscription => subscription.name === 'Simulation');
        this.subscriptionsSolution = data.find(subscription => subscription.name === 'Solution');
        this.subscriptionsSupplyChain = data.find(subscription => subscription.name === 'Supply Chain');

      },
    });
  }

  goToPlan(mercadoPagoPlanId?: string) {
    if(!mercadoPagoPlanId) {
      this.toastr.error('O plano não está disponível no momento');
      return
    }

    // Abre o modal do formulário
    const modalRef = this.modalService.open(PaymentOrientationModalComponent, {
      centered: true,
    });

    // Se inscreve no status do modal
    modalRef.componentInstance.submitted.subscribe((next: boolean) => {
      if (next) {
        console.log(mercadoPagoPlanId);

        window.open(
          'https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=' +
            mercadoPagoPlanId,
          '_blank'
        );
      }
    });
  }
}
