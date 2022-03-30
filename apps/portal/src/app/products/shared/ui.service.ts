import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


interface Sortable {
  [key: string]: string
  // "date_desc"       : "date_desc",
  // "date_asc"        : "date_asc",
  // "sales_asc"       : "sales_asc",
  // "base_price_desc" : "base_price_desc",
  // "base_price_asc"  : "base_price_asc" ,
}
export const ESortingBehaviour: Sortable = {
  "date_desc"       : "date_desc",
  "date_asc"        : "date_asc",
  "sales_asc"       : "sales_asc",
  "base_price_desc" : "base_price_desc",
  "base_price_asc"  : "base_price_asc" ,
} 

// export type SortingBehaviour = "date_desc" | "date_asc" | "sales_asc" | "base_price_desc" | "base_price_asc"
// export enum ESortingBehaviour {
//   "date_desc"       = "date_desc",
//   "date_asc"        = "date_asc",
//   "sales_asc"       = "sales_asc",
//   "base_price_desc" = "base_price_desc",
//   "base_price_asc"  = "base_price_asc",
// }

@Injectable()
export class UiService {
  public sorting$ = new BehaviorSubject(ESortingBehaviour['date_desc']);
  public displayMode$ = new BehaviorSubject('grid');
  public currentPagingPage$ = new BehaviorSubject(1);

  constructor() {}
}
