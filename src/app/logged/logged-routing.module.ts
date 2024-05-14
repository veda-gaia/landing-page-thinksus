import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssesmentComponent } from './assesment/assesment.component';
import { AssesmentQuestionaryComponent } from './assesment-questionary/assesment-questionary.component';
import { OdsComponent } from './ods/ods.component';
import { ResultsComponent } from './results/results.component';
import { LoggedComponent } from './logged.component';


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
        path: 'assesment/questionary',
        component: AssesmentQuestionaryComponent
      },
      {
        path: 'ods',
        component: OdsComponent
      },
      {
        path: 'results',
        component: ResultsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggedRoutingModule { }
