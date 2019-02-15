import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Pizza, PizzasService } from '@ngxs-app/data-access-products';

@Component({
  selector: 'ngxs-app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {
  pizzas: Pizza[];

  constructor(private pizzaService: PizzasService) {}

  ngOnInit() {
    this.pizzaService.getPizzas().subscribe(pizzas => {
      this.pizzas = pizzas;
    });
  }
}
