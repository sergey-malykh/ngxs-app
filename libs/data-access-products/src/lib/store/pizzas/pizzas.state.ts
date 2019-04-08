import { Action, Selector, State, StateContext } from "@ngxs/store";
import { CreatePizza, LoadPizzas, LoadPizzasFail, LoadPizzasSuccess, RemovePizza, UpdatePizza } from "./pizzas.actions";
import { catchError, mergeMap, tap } from "rxjs/operators";
import { Pizza, PizzasService } from "../../pizzas/";
import { RouteNavigate } from "../../../../../../apps/sandbox/src/store/router.actions";

export interface PizzaStateModel {
  entities: { [ id: number ]: Pizza };
  loaded: boolean;
  loading: boolean;
}

const initialState: PizzaStateModel = {
  entities: {},
  loaded: false,
  loading: false,
};

@State<PizzaStateModel>({
  name: 'pizzas',
  defaults: initialState
})
export class PizzasState {

  constructor(private pizzaService: PizzasService) {
  }

  @Selector()
  static entities(state: PizzaStateModel) {
    return state.entities;
  }

  @Selector()
  static loading(state: PizzaStateModel): boolean {
    return state.loading
  }

  @Action(LoadPizzas)
  loadPizzas({ patchState, dispatch }: StateContext<PizzaStateModel>) {
    patchState({
      loading: true
    });
    return this.pizzaService.getPizzas()
      .pipe(
        mergeMap((data: Pizza[]) => dispatch(new LoadPizzasSuccess(data))),
        catchError((error) => dispatch(new LoadPizzasFail(error)))
      );
  }

  @Action(LoadPizzasSuccess)
  loadPizzasSuccess(ctx: StateContext<PizzaStateModel>, action: LoadPizzasSuccess) {
    const state = ctx.getState();
    const entities = action.pizzas.reduce(
      (acc: { [id: number]: Pizza}, pizza: Pizza) => {
        return {
          ...acc,
          [pizza.id]: pizza
        }
      },
      {
        ...state.entities
      }
    );
    ctx.patchState({
      loaded: true,
      loading: false,
      entities
    })
  }

  @Action(LoadPizzasFail)
  loadPizzasFail(ctx: StateContext<PizzaStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      loaded: false,
      loading: false
    })
  }

  @Action(CreatePizza)
  createPizza(ctx: StateContext<PizzaStateModel>, action: CreatePizza) {
    const state = ctx.getState();
    return this.pizzaService.createPizza(action.pizza)
      .pipe(
        tap((pizza: Pizza) => {
          ctx.setState({
            ...state,
            entities: {
              ...state.entities,
              [pizza.id]: pizza
            }
          })
        }),
        mergeMap(() => ctx.dispatch(new RouteNavigate(['/products'])))
      )
  }

  @Action(UpdatePizza)
  updatePizza(ctx: StateContext<PizzaStateModel>, action: UpdatePizza) {
    const state = ctx.getState();
    return this.pizzaService.updatePizza(action.pizza)
      .pipe(
        tap((pizza: Pizza) => {
          ctx.setState({
            ...state,
            entities: {
              ...state.entities,
              [pizza.id]: pizza
            }
          })
        }),
        mergeMap(() => ctx.dispatch(new RouteNavigate(['/products'])))
      )
  }

  @Action(RemovePizza)
  removePizza(ctx: StateContext<PizzaStateModel>, action: RemovePizza) {
    const state = ctx.getState();
    return this.pizzaService.removePizza(action.pizza)
      .pipe(
        tap((pizza: Pizza) => {
          const { [pizza.id]: removed, ...entities } = state.entities;
          ctx.patchState({
            entities
          })
        }),
        mergeMap((pizza: Pizza) => ctx.dispatch(new RouteNavigate(['/products', String(pizza.id)])))
      )
  }
}
