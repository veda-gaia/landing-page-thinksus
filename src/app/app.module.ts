import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { EsgComponent } from './components/esg/esg.component';
import { PlansComponent } from './components/plans/plans.component';
import { WhoWeAreComponent } from './components/who-we-are/who-we-are.component';
import { RatingSystemComponent } from './components/rating-system/rating-system.component';
import { KnowMoreComponent } from './components/know-more/know-more.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    EsgComponent,
    PlansComponent,
    WhoWeAreComponent,
    RatingSystemComponent,
    KnowMoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
