import { Topping } from '../toppings/topping.interface';

export interface Pizza {
  id?: number;
  name?: string;
  toppings?: Topping[];
}
