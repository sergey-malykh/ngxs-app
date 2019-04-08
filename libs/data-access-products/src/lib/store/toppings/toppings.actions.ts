import { Topping } from "../../toppings";

// load toppings
export class LoadToppings {
  public static readonly type = '[Products] Load Toppings';
}

export class LoadToppingsFail {
  public static readonly type = '[Products] Load Toppings Fail';
  constructor(public error: any) {}
}

export class LoadToppingsSuccess {
  public static readonly type = '[Products] Load Toppings Success';
  constructor(public toppings: Topping[]) {}
}

export class VisualiseToppings {
  public static readonly type = '[Products] Visualise Toppings';
  constructor(public ids: number[]) {}
}

// action types
export type ToppingsAction = LoadToppings | LoadToppingsFail | LoadToppingsSuccess | VisualiseToppings;
