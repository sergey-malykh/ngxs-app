import { Selector } from "@ngxs/store";
import { Pizza } from "../../pizzas/";
import { PizzasState } from "../pizzas";
import { ToppingsState } from "../toppings";
import { Topping } from "../../toppings";
import { RouterState, RouterStateModel } from "@ngxs/router-plugin";
import { RouterStateParams } from "../../../../../../apps/sandbox/src/store/router-serializer";

export class ProductsSelectors {

  @Selector([PizzasState.entities])
  static pizzas(entities: {[id: number]: Pizza}) {
    return getArrayFromEntities(entities);
  }

  @Selector([ToppingsState.entities])
  static toppings(entities: {[id: number]: Topping}) {
    return getArrayFromEntities(entities);
  }

  @Selector([PizzasState.entities, RouterState])
  static getSelectedPizza(entities: {[id: number]: Pizza}, routerState: RouterStateModel<RouterStateParams>): Pizza {
    const pizzaId = routerState.state && routerState.state.params.pizzaId;
    return pizzaId && entities[pizzaId];
  }

  @Selector([ProductsSelectors.getSelectedPizza, ToppingsState.entities, ToppingsState.selectedToppings])
  static getPizzaVisualized(selectedPizza: Pizza, toppingEntities: {[id: number]: Topping}, selectedToppings: number[]): Pizza {
    return {
      ...selectedPizza,
      toppings: selectedToppings.map((selected: number) => toppingEntities[selected])
    }
  }
}

function getArrayFromEntities<T>(entities: { [ id: number ]: T }): T[] {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
}
