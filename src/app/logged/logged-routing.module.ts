import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssesmentComponent } from './assesment/assesment.component';
import { OdsComponent } from './ods/ods.component';
import { ResultsComponent } from './results/results.component';
import { LoggedComponent } from './logged.component';
import { EAgroComponent } from './questionary/e-agro/e-agro.component';
import { SAgroComponent } from './questionary/s-agro/s-agro.component';
import { GAgroComponent } from './questionary/g-agro/g-agro.component';
import { EIndustryComponent } from './questionary/e-industry/e-industry.component';
import { SIndustryComponent } from './questionary/s-industry/s-industry.component';
import { GIndustryComponent } from './questionary/g-industry/g-industry.component';
import { EServiceComponent } from './questionary/e-service/e-service.component';
import { SServiceComponent } from './questionary/s-service/s-service.component';
import { GServiceComponent } from './questionary/g-service/g-service.component';
import { PaymentComponent } from './payment/payment.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { ImprovementsComponent } from './improvements/improvements.component';
import { UseInstructionsComponent } from './use-instructions/use-instructions.component';


const routes: Routes = [
  {
    path: '',
    component: LoggedComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'assesment',
        component: AssesmentComponent
      },
      {
        path: 'ods',
        component: OdsComponent
      },
      {
        path: 'control-panel',
        component: ControlPanelComponent
      },
      {
        path: 'suppliers',
        component: SuppliersComponent
      },
      {
        path: 'use-instructions',
        component: UseInstructionsComponent
      },
      {
        path: 'results',
        component: ResultsComponent
      },
      {
        path: 'results/improvements',
        component: ImprovementsComponent
      },
      {
        path: 'payment',
        component: PaymentComponent
      },

      // Questionary
      {
        path: 'assesment/e-agro',
        component: EAgroComponent
      },
      {
        path: 'assesment/s-agro',
        component: SAgroComponent
      },
      {
        path: 'assesment/g-agro',
        component: GAgroComponent
      },
      {
        path: 'assesment/e-industry',
        component: EIndustryComponent
      },
      {
        path: 'assesment/s-industry',
        component: SIndustryComponent
      },
      {
        path: 'assesment/g-industry',
        component: GIndustryComponent
      },
      {
        path: 'assesment/e-service',
        component: EServiceComponent
      },
      {
        path: 'assesment/s-service',
        component: SServiceComponent
      },
      {
        path: 'assesment/g-service',
        component: GServiceComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggedRoutingModule { }
