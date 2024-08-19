import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreeTestComponent } from './landing/free-test/free-test.component';

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
