import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { DateFormatPipe } from '../pipes/date-format.pipe';
import { EsgRatingService } from '../services/esg-rating.service';
import { AddSupplierModalComponent } from './add-supplier-modal/add-supplier-modal.component';
import { AssesmentComponent } from './assesment/assesment.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ImprovementsComponent } from './improvements/improvements.component';
import { LoggedRoutingModule } from './logged-routing.module';
import { LoggedComponent } from './logged.component';
import { OdsComponent } from './ods/ods.component';
import { PaymentComponent } from './payment/payment.component';
import { ConfirmModalComponent } from './questionary/confirm-modal/confirm-modal.component';
import { EAgroComponent } from './questionary/e-agro/e-agro.component';
import { EIndustryComponent } from './questionary/e-industry/e-industry.component';
import { EServiceComponent } from './questionary/e-service/e-service.component';
import { GAgroComponent } from './questionary/g-agro/g-agro.component';
import { GIndustryComponent } from './questionary/g-industry/g-industry.component';
import { GServiceComponent } from './questionary/g-service/g-service.component';
import { SAgroComponent } from './questionary/s-agro/s-agro.component';
import { SIndustryComponent } from './questionary/s-industry/s-industry.component';
import { SServiceComponent } from './questionary/s-service/s-service.component';
import { ResultsComponent } from './results/results.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
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
