import { Component, OnInit } from '@angular/core';
import {
  CreatePizza,
  Pizza,
  ProductsSelectors, RemovePizza,
  Topping,
  UpdatePizza,
  VisualiseToppings
} from '@ngxs-app/data-access-products';
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { LoadToppings } from "@ngxs-app/data-access-products";
import { tap } from "rxjs/operators";

@Component({
  selector: 'ngxs-app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent implements OnInit {

  pizza$: Observable<Pizza>;

  @Select(ProductsSelectors.getPizzaVisualized)
  visualise$: Observable<Pizza>;

  @Select(ProductsSelectors.toppings)
  toppings$: Observable<Topping[]>;

  constructor(
    private store: Store,
  ) {}

  ngOnInit() {
    this.pizza$ = this.store.select(ProductsSelectors.getSelectedPizza).pipe(
      tap((pizza: Pizza = null) => {
        const pizzaExists = !!(pizza && pizza.toppings);
        const toppings = pizzaExists
          ? pizza.toppings.map(topping => topping.id)
          : [];
        this.store.dispatch(new VisualiseToppings(toppings));
      })
    );
    this.store.dispatch(new LoadToppings());
  }

  onSelect(event: number[]) {
    this.store.dispatch(new VisualiseToppings(event));
  }

  onCreate(event: Pizza) {
    this.store.dispatch(new CreatePizza(event));
  }

  onUpdate(event: Pizza) {
    this.store.dispatch(new UpdatePizza(event));
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(new RemovePizza(event));
    }
  }
}
