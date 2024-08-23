import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContractedPlanService } from '../../services/contracted-plan.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent {
  constructor(
    private route: ActivatedRoute,
    private contractedPlanService: ContractedPlanService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.vinculatePlan();
  }

  vinculatePlan() {
    this.route.queryParams.subscribe((params) => {
      const preapproval_id = params['preapproval_id'];
      if(!preapproval_id){
        this.router.navigate(['/logged/dashboard']);
        return;
      }
      this.contractedPlanService.vinculatePlan(preapproval_id).subscribe({
        next: (data) => {
          console.log(data);
          this.toastr.success('Plano assinado com sucesso!');
          this.router.navigate(['/logged/dashboard']);
        },
        error: (error) => {
          this.toastr.error('Erro ao assinar o plano, entre em contato com suporte',"Erro ao assinar o plano");
          this.router.navigate(['/logged/dashboard']);
          console.log(error);
        },
      });
    });
  }
}
