import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssesmentComponent } from './assesment/assesment.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImprovementsComponent } from './improvements/improvements.component';
import { LoggedComponent } from './logged.component';
import { OdsComponent } from './ods/ods.component';
import { PaymentComponent } from './payment/payment.component';
import { ResultsComponent } from './results/results.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { UseInstructionsComponent } from './use-instructions/use-instructions.component';
import { ProfileComponent } from './profile/profile.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { PlansComponent } from './plans/plans.component';
import { AssessmentQuestionnaireComponent } from './assessment-questionnaire/assessment-questionnaire.component';

const routes: Routes = [
  {
    path: '',
    component: LoggedComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'assesment',
        component: AssesmentComponent,
      },
      {
        path: 'ods',
        component: OdsComponent,
      },
      {
        path: 'control-panel',
        component: ControlPanelComponent,
      },
      {
        path: 'suppliers',
        component: SuppliersComponent,
      },
      {
        path: 'use-instructions',
        component: UseInstructionsComponent,
      },
      {
        path: 'results',
        component: ResultsComponent,
      },
      {
        path: 'results/improvements/:id',
        component: ImprovementsComponent,
      },
      {
        path: 'payment',
        component: PaymentComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'plans',
        component: PlansComponent,
      },

      // Questionário de avaliação (ADR-0031 — tela única, dinâmica por setor/pilar/segmento)
      {
        path: 'assesment/questionary/:sectionId/:symbolId/:segmentId',
        component: AssessmentQuestionnaireComponent,
      },
      {
        path: 'confirmation',
        component: ConfirmationComponent,
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoggedRoutingModule {}
