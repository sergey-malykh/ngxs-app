import { Component, OnInit } from '@angular/core';
import { LoadPizzas, Pizza } from '@ngxs-app/data-access-products';
import { Actions, Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { ProductsSelectors } from "@ngxs-app/data-access-products";

@Component({
  selector: 'ngxs-app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {

  @Select(ProductsSelectors.pizzas) pizzas$: Observable<Pizza[]>;

  constructor(private store: Store, private actions$: Actions) {}

  ngOnInit() {
    this.store.dispatch(new LoadPizzas());
  }
}
