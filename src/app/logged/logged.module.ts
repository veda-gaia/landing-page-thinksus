import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoggedRoutingModule } from './logged-routing.module';
import { ResultsComponent } from './results/results.component';
import { OdsComponent } from './ods/ods.component';
import { ImprovementsComponent } from './improvements/improvements.component';
import { AssesmentComponent } from './assesment/assesment.component';
import { AssesmentQuestionaryComponent } from './assesment-questionary/assesment-questionary.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ResultsComponent,
    OdsComponent,
    ImprovementsComponent,
    AssesmentComponent,
    AssesmentQuestionaryComponent
  ],
  imports: [
    CommonModule,
    LoggedRoutingModule
  ]
})
export class LoggedModule { }
