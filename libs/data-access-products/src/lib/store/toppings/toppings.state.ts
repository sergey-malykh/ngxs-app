import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Topping, ToppingsService } from "../../toppings";
import { catchError, mergeMap } from "rxjs/operators";
import { LoadToppings, LoadToppingsFail, LoadToppingsSuccess, VisualiseToppings } from "./toppings.actions";

export interface ToppingsStateModel {
  entities: { [ id: number ]: Topping };
  loaded: boolean;
  loading: boolean;
  selectedToppings: number[];
}

const initialState: ToppingsStateModel = {
  entities: {},
  loaded: false,
  loading: false,
  selectedToppings: [],
};

@State({
  name: 'toppings',
  defaults: initialState
})
export class ToppingsState {
  constructor(private toppingsService: ToppingsService) {
  }

  @Selector()
  static entities(state: ToppingsStateModel) {
    return state.entities;
  }

  @Selector()
  static selectedToppings(state: ToppingsStateModel): number[] {
    return state.selectedToppings;
  }

  @Action(LoadToppings)
  loadToppings({ patchState, dispatch }: StateContext<ToppingsStateModel>) {
    patchState({
      loading: true
    });
    return this.toppingsService.getToppings()
      .pipe(
        mergeMap((data: Topping[]) => dispatch(new LoadToppingsSuccess(data))),
        catchError((error) => dispatch(new LoadToppingsFail(error)))
      );
  }

  @Action(LoadToppingsSuccess)
  loadToppingsSuccess(ctx: StateContext<ToppingsStateModel>, action: LoadToppingsSuccess) {
    const state = ctx.getState();
    const entities = action.toppings.reduce(
      (acc: { [id: number]: Topping}, topping: Topping) => {
        return {
          ...acc,
          [topping.id]: topping
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

  @Action(LoadToppingsFail)
  loadToppingsFail({ patchState }: StateContext<ToppingsStateModel>) {
    patchState({
      loaded: false,
      loading: false
    })
  }

  @Action(VisualiseToppings)
  visualizeToppings({patchState}: StateContext<ToppingsStateModel>, action: VisualiseToppings) {
    patchState({
      selectedToppings: action.ids
    })
  }

}
