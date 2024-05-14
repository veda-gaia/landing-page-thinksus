import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EsgComponent } from './esg/esg.component';
import { FreeTestComponent } from './free-test/free-test.component';
import { HomeComponent } from './home/home.component';
import { KnowMoreComponent } from './know-more/know-more.component';
import { LoginComponent } from './login/login.component';
import { PlansComponent } from './plans/plans.component';
import { RatingSystemComponent } from './rating-system/rating-system.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'esg',
    component: EsgComponent,
  },
  {
    path: 'plans',
    component: PlansComponent,
  },
  {
    path: 'about-us',
    component: KnowMoreComponent,
  },
  {
    path: 'free-test',
    component: FreeTestComponent,
  },
  {
    path: 'about-us',
    component: KnowMoreComponent,
  },
  {
    path: 'enterprise-rating-system',
    component: RatingSystemComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
