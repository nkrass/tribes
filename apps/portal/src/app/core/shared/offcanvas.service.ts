import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type OffcanvasState = {
  search_visible: boolean,
  menu_visible: boolean
}
@Injectable()
export class OffcanvasService {
  public offcanvasNavigationState$ = new BehaviorSubject<OffcanvasState>({search_visible: false, menu_visible: false});

  public toggleOffcanvasNavigation(state: OffcanvasState) {
    this.offcanvasNavigationState$.next(state);
  }
}
