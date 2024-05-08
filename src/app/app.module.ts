import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { EsgComponent } from './components/esg/esg.component';
import { PlansComponent } from './components/plans/plans.component';
import { RatingSystemComponent } from './components/rating-system/rating-system.component';
import { KnowMoreComponent } from './components/know-more/know-more.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FreeTestComponent } from './components/free-test/free-test.component';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask } from 'ngx-mask';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    EsgComponent,
    PlansComponent,
    RatingSystemComponent,
    KnowMoreComponent,
    FreeTestComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [
    provideEnvironmentNgxMask(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
