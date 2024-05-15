import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoggedRoutingModule } from './logged-routing.module';
import { ResultsComponent } from './results/results.component';
import { OdsComponent } from './ods/ods.component';
import { ImprovementsComponent } from './improvements/improvements.component';
import { AssesmentComponent } from './assesment/assesment.component';
import { AssesmentQuestionaryComponent } from './assesment-questionary/assesment-questionary.component';
import { LoggedComponent } from './logged.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';



@NgModule({
  declarations: [
    LoggedComponent,
    DashboardComponent,
    ResultsComponent,
    OdsComponent,
    ImprovementsComponent,
    AssesmentComponent,
    AssesmentQuestionaryComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    LoggedRoutingModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    TranslateModule
  ]
})
export class LoggedModule { }
