import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarNumberDetailsModule } from './car-number-details/car-number-details.module';
import { HomeComponent } from './car-number-details/home/home.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./car-number-details/car-number-details.module').then(c => c.CarNumberDetailsModule) },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
