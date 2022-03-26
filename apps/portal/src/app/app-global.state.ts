import { InjectionToken } from "@angular/core";
import { RxState } from "@rx-angular/state";
import { CartQuery, UserQuery, CreateCartMutation } from "gql/types";

export interface AppGlobalState {
  cart: CartQuery['cart'] | CreateCartMutation['createCart'];
  user: UserQuery["user"];
  showCart: boolean;
}
export const APP_GLOBAL_STATE = new InjectionToken<RxState<AppGlobalState>>('APP_GLOBAL_STATE');