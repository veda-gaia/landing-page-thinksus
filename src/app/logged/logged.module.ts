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
import { ConfirmModalComponent } from './assessment-questionnaire/confirm-modal/confirm-modal.component';
import { ResultsComponent } from './results/results.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { UseInstructionsComponent } from './use-instructions/use-instructions.component';
// import { PlotlyModule } from 'angular-plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist-min';
import { ProfileComponent } from './profile/profile.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { PlansComponent } from './plans/plans.component';
import { PaymentOrientationModalComponent } from './plans/payment-orientation-modal/payment-orientation-modal.component';
import { ScoreWarningComponent } from './score-warning/score-warning.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CnpjPipe } from '../pipes/cnpj-format.pipe';
import { CompanyRevenuePipe } from '../pipes/company-revenue.pipe';
import { AssessmentQuestionnaireComponent } from './assessment-questionnaire/assessment-questionnaire.component';
import { MarkdownModule } from 'ngx-markdown';

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
    ConfirmModalComponent,
    PaymentComponent,
    ControlPanelComponent,
    SuppliersComponent,
    AddSupplierModalComponent,
    DateFormatPipe,
    UseInstructionsComponent,
    ProfileComponent,
    ConfirmationComponent,
    PlansComponent,
    PaymentOrientationModalComponent,
    ScoreWarningComponent,
    CnpjPipe,
    CompanyRevenuePipe,
    AssessmentQuestionnaireComponent,
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
    PlotlyModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MarkdownModule.forRoot(),
  ],
  providers: [EsgRatingService, DateFormatPipe],
})
export class LoggedModule {}