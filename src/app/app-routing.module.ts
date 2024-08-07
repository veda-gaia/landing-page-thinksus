import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './landing/home/home.component';
import { EsgComponent } from './landing/esg/esg.component';
import { PlansComponent } from './landing/plans/plans.component';
import { RatingSystemComponent } from './landing/rating-system/rating-system.component';
import { KnowMoreComponent } from './landing/know-more/know-more.component';
import { FreeTestComponent } from './landing/free-test/free-test.component';
import { RegisterComponent } from './landing/register/register.component';
import { LoginComponent } from './landing/login/login.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)
  },
  {
    path: 'logged',
    loadChildren: () => import('./logged/logged.module').then(m => m.LoggedModule)
  },
  {
    path: 'simulation',
    component: FreeTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
