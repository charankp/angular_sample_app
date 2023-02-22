import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarNumberDetailsRoutingModule } from './car-number-details-routing.module';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { carNumberReducer } from './store/carnumbers.reducer';
import { EffectsModule } from '@ngrx/effects';
import { carNumberEffects } from './store/carnumbers.effects';
import { AddComponent } from './add/add.component';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    HomeComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CarNumberDetailsRoutingModule,
    StoreModule.forFeature("car-number-details", carNumberReducer),
    EffectsModule.forFeature(carNumberEffects)
  ]
})
export class CarNumberDetailsModule { }
