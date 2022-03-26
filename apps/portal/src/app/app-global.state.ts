import { InjectionToken } from "@angular/core";
import { RxState } from "@rx-angular/state";
import {CartQuery, CreateCartMutation, UserQuery} from '@tribes/data-access'
export interface AppGlobalState {
  cart: CartQuery['cart'] | CreateCartMutation['createCart'];
  user: UserQuery["user"];
  showCart: boolean;
  showSearch: boolean;
  showMenu: boolean
}
export const APP_GLOBAL_STATE = new InjectionToken<RxState<AppGlobalState>>('APP_GLOBAL_STATE');