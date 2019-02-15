import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaFormComponent } from './pizza-form/pizza-form.component';
import { PizzaDisplayComponent } from './pizza-display/pizza-display.component';
import { PizzaToppingsComponent } from './pizza-toppings/pizza-toppings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PizzaItemComponent } from './pizza-item/pizza-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  declarations: [
    PizzaItemComponent,
    PizzaFormComponent,
    PizzaDisplayComponent,
    PizzaToppingsComponent
  ],
  exports: [
    PizzaItemComponent,
    PizzaFormComponent,
    PizzaDisplayComponent,
    PizzaToppingsComponent
  ]
})
export class UiProductsModule {}
