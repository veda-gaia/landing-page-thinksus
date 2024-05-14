import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './landing/header/header.component';
import { FooterComponent } from './landing/footer/footer.component';
import { HomeComponent } from './landing/home/home.component';
import { EsgComponent } from './landing/esg/esg.component';
import { PlansComponent } from './landing/plans/plans.component';
import { RatingSystemComponent } from './landing/rating-system/rating-system.component';
import { KnowMoreComponent } from './landing/know-more/know-more.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FreeTestComponent } from './landing/free-test/free-test.component';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask } from 'ngx-mask';
import { RegisterComponent } from './landing/register/register.component';
import { LoginComponent } from './landing/login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CepService } from './services/cep.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

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
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    provideEnvironmentNgxMask(),
    CepService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
