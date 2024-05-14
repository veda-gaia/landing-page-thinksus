import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssesmentComponent } from './assesment/assesment.component';
import { AssesmentQuestionaryComponent } from './assesment-questionary/assesment-questionary.component';
import { OdsComponent } from './ods/ods.component';
import { ResultsComponent } from './results/results.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    redirectTo: 'dashboard',
    component: DashboardComponent
  },
  {
    redirectTo: 'assesment',
    component: AssesmentComponent
  },
  {
    redirectTo: 'assesment/questionary',
    component: AssesmentQuestionaryComponent
  },
  {
    redirectTo: 'ods',
    component: OdsComponent
  },
  {
    redirectTo: 'results',
    component: ResultsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggedRoutingModule { }
