import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToppingsService } from './toppings';
import { PizzasService } from './pizzas';

@NgModule({
  imports: [CommonModule],
  providers: [ToppingsService, PizzasService]
})
export class DataAccessProductsModule {}
