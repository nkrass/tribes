import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { Subject } from 'rxjs';
import { map, take } from 'rxjs';
import { CartService } from './cart.service';
 
 
@Injectable()
export class CartGuardService implements CanActivate {
  private readonly unsubscribe$ = new Subject();
  constructor(private _router: Router, private cartService: CartService ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.cartService.cart$.pipe(
      map(cart => {
        if (cart.cartItems.length > 0) return true;
        else {
          this._router.navigate(['/cart']);
        }
        return false;
      }),
      take(1)
    )
  }
 
}