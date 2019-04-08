import { Pizza } from "../../pizzas";

// load pizzas
export class LoadPizzas {
  public static readonly type = '[Products] Load Pizzas';
}

export class LoadPizzasFail {
  public static readonly type = '[Products] Load Pizzas Fail';

  constructor(public error: any) {
  }
}

export class LoadPizzasSuccess {
  public static readonly type = '[Products] Load Pizzas Success';

  constructor(public pizzas: Pizza[]) {
  }
}

export class CreatePizza {
  public static readonly type = '[Products] Create Pizza';

  constructor(public pizza: Pizza) {
  }
}

export class UpdatePizza {
  public static readonly type = '[Products] Update Pizza';

  constructor(public pizza: Pizza) {
  }
}

export class RemovePizza {
  public static readonly type = '[Products] Remove Pizza';

  constructor(public pizza: Pizza) {
  }
}

// action types
export type PizzasAction = LoadPizzas | LoadPizzasFail | LoadPizzasSuccess | CreatePizza | UpdatePizza | RemovePizza;
