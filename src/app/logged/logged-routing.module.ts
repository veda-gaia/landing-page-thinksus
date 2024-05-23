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
        path: 'results',
        component: ResultsComponent
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggedRoutingModule { }
