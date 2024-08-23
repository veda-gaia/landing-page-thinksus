import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EsgComponent } from './esg/esg.component';
import { FreeTestComponent } from './free-test/free-test.component';
import { HomeComponent } from './home/home.component';
import { KnowMoreComponent } from './know-more/know-more.component';
import { LoginComponent } from './login/login.component';
import { PlansComponent } from './plans/plans.component';
import { RatingSystemComponent } from './rating-system/rating-system.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask } from 'ngx-mask';
import { TranslateModule } from '@ngx-translate/core';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    LandingComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    EsgComponent,
    PlansComponent,
    RatingSystemComponent,
    KnowMoreComponent,
    FreeTestComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    TranslateModule
  ],
  providers: [
    provideEnvironmentNgxMask(),
  ]
})
export class LandingModule { }
