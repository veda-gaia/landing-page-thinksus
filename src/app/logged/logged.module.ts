import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoggedRoutingModule } from './logged-routing.module';
import { ResultsComponent } from './results/results.component';
import { OdsComponent } from './ods/ods.component';
import { ImprovementsComponent } from './improvements/improvements.component';
import { AssesmentComponent } from './assesment/assesment.component';
import { LoggedComponent } from './logged.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { EAgroComponent } from './questionary/e-agro/e-agro.component';
import { SAgroComponent } from './questionary/s-agro/s-agro.component';
import { GAgroComponent } from './questionary/g-agro/g-agro.component';
import { EServiceComponent } from './questionary/e-service/e-service.component';
import { SServiceComponent } from './questionary/s-service/s-service.component';
import { GServiceComponent } from './questionary/g-service/g-service.component';
import { EIndustryComponent } from './questionary/e-industry/e-industry.component';
import { SIndustryComponent } from './questionary/s-industry/s-industry.component';
import { GIndustryComponent } from './questionary/g-industry/g-industry.component';



@NgModule({
  declarations: [
    LoggedComponent,
    DashboardComponent,
    ResultsComponent,
    OdsComponent,
    ImprovementsComponent,
    AssesmentComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    EAgroComponent,
    SAgroComponent,
    GAgroComponent,
    EServiceComponent,
    SServiceComponent,
    GServiceComponent,
    EIndustryComponent,
    SIndustryComponent,
    GIndustryComponent,
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
