import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToppingsService } from './toppings';
import { PizzasService } from './pizzas';
import { NgxsModule } from "@ngxs/store";
import { PizzasState } from "./store/pizzas";
import { ToppingsState } from "./store/toppings";

@NgModule({
  imports: [ CommonModule,
    NgxsModule.forFeature([ PizzasState, ToppingsState ])
  ],
  providers: [ ToppingsService, PizzasService ]
})
export class DataAccessProductsModule {
}
