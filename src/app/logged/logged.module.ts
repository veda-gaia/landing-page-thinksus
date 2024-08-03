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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from './questionary/confirm-modal/confirm-modal.component';
import { PaymentComponent } from './payment/payment.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { AddSupplierModalComponent } from './add-supplier-modal/add-supplier-modal.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { EsgRatingService } from '../services/esg-rating.service';
import { DateFormatPipe } from '../pipes/date-format.pipe';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { UseInstructionsComponent } from './use-instructions/use-instructions.component';
// import { PlotlyModule } from 'angular-plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist-min';

PlotlyModule.plotlyjs = PlotlyJS;

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
    ConfirmModalComponent,
    PaymentComponent,
    ControlPanelComponent,
    SuppliersComponent,
    AddSupplierModalComponent,
    DateFormatPipe,
    UseInstructionsComponent,
  ],
  imports: [
    CommonModule,
    LoggedRoutingModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    TranslateModule,
    NgbModule,
    CurrencyMaskModule,
    NgxDocViewerModule,
    PlotlyModule
  ],
  providers: [
    EsgRatingService,
    DateFormatPipe
  ]
})
export class LoggedModule { }
