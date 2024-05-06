import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EsgComponent } from './components/esg/esg.component';
import { PlansComponent } from './components/plans/plans.component';
import { RatingSystemComponent } from './components/rating-system/rating-system.component';
import { KnowMoreComponent } from './components/know-more/know-more.component';
import { FreeTestComponent } from './components/free-test/free-test.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
