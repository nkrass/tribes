import { Inject, Injectable } from '@angular/core';
import { BaseCookieService } from '../../shared/storage/services/base-cookie.service';
import { switchMap, map, pluck, Observable, tap, BehaviorSubject, of, Subject, distinctUntilChanged, catchError} from 'rxjs';
import { environment } from '../../../../src/environments/environment';
import { AnalyticsService } from 'app/shared/analytics.service';
import { CartGQL, CartItems, CartQuery, CartStatus, CreateCartGQL, CreateCartMutation, ProductQuery, UpdateCartGQL, UpdateCartInput, UpdateCartMutation } from 'gql/types';
import { RxState } from '@rx-angular/state';
import { AppGlobalState, APP_GLOBAL_STATE } from 'app/app-global.state';
import { BaseLocalStorage } from 'app/shared/storage/storages/base-local.storage';

const CART_ID = '_3bs_cart_id'

@Injectable()
export class CartService {
  // Init and generate some fixtures
  readonly cart$ = this.globalState.select('cart')  //new BehaviorSubject<Cart>(new Cart([]));
  public cartShow$ = new BehaviorSubject<boolean>(false);
  private readonly user$ = this.globalState.select('user')

  private cartId$ = new BehaviorSubject(this.getCartIdFromCookies())
  private updateCard$ = new Subject<CartQuery['cart']>()
  constructor(
    private cookieStorage: BaseCookieService, 
    private localStorage: BaseLocalStorage,
    private analytics: AnalyticsService,
    private readonly cartGql: CartGQL,
    private readonly createCartGql: CreateCartGQL,
    private readonly updateCartGql: UpdateCartGQL,
    @Inject(APP_GLOBAL_STATE) private globalState: RxState<AppGlobalState>,
  ) {
    this.globalState.connect("cart", this.initCart())
    this.globalState.connect("showCart", this.cartShow$)
    this.globalState.connect(this.updateCard$.pipe(
      switchMap(this.updateToServer.bind(this))
      ), (state, event) => {
      return {...state}
    })
  }
  updateToServer(cart: CartQuery['cart']){
    return this.updateCartGql.mutate({input: {
      id: cart.id,
      items: cart.cartItems.map(item => {
        return {
          barcode: item.barcode?.barcode,
          quantity: item.quantity,
          price: item.price,
          currency: item.currency || "RUB"
        }
      }).filter(item => (item.quantity!>0)),
      status: cart.status || CartStatus.Open
    }}).pipe(
      pluck('data', 'updateCart'), 
      map( cart => {
        // this.globalState.set({ cart: cart?.updateCart })
        // this.cartId$.next(cart?.updateCart.id || null)
        return { cart }
      }),
    )
  }
  public updateCartItemsAmount(barcode: CartQuery['cart']['cartItems'][0]['barcode'], amount: number){
    const cart = this.globalState.get('cart');
    const newCartItems = cart.cartItems.map(item => {
      const newItem = {...item}
      if (newItem.barcode?.barcode === barcode?.barcode) {
        newItem.quantity = amount
      }
      return newItem
    })
    this.analytics.addToCart(newCartItems)
    const newCart = {
      ...cart, 
      cartItems: newCartItems, 
      totalItemsCount: newCartItems.reduce((acc, item) => acc + item.quantity!, 0),
      totalAmount: newCartItems.reduce((acc, item) => acc + item.quantity! * item.price!, 0)}
    this.updateCard$.next(newCart)
  }
  public deleteItems(barcodes: CartQuery['cart']['cartItems'][0]['barcode'][]){
    const cart = this.globalState.get('cart');
    const newCartItems = cart.cartItems.filter(item => !barcodes.map(b => b?.barcode).includes(item.barcode?.barcode!)).filter(item => (item.quantity!>0))
    const newCart = {
      ...cart, 
      cartItems: newCartItems, 
      totalItemsCount: newCartItems.reduce((acc, item) => acc + item.quantity!, 0),
      totalAmount: newCartItems.reduce((acc, item) => acc + item.quantity! * item.price!, 0)
    }
    this.updateCard$.next(newCart)
  }
  public addItems(cartItems: CartQuery['cart']['cartItems']){
    let cart = this.globalState.get('cart');
    ///cartItems is Sealed, so create new
    const newCartItems: CartQuery['cart']['cartItems'] = []
    const newQuantities: CartQuery['cart']['cartItems'] = []
    for (let cartItem of cartItems) {
      //icrease quantity if already in the cart
      cart.cartItems.map(item => {
        if (item.barcode?.barcode === cartItem?.barcode?.barcode) {
          newQuantities.push({ ...item, quantity: item.quantity? item.quantity + 1 : 1 })
        }
        return
      })
      if (!cart.cartItems.map(b =>b.barcode?.barcode).includes(cartItem?.barcode?.barcode)){
        //if no barcode in it
        newCartItems.push({...cartItem, quantity: 1, price: cartItem.price } as any)
      }
    }
    const newItems = [...newCartItems, ...newQuantities]
    this.analytics.addToCart(newItems)
    const newCart = {
      ...cart, 
      cartItems: newItems, 
      totalAmount: newItems.reduce((acc, item) => acc + item.quantity! * item.price!, 0),
      totalItemsCount: newItems.reduce((acc, item) => acc + item.quantity!, 0)
    }
    this.updateCard$.next(newCart)
  }
  public clearCart(status: CartStatus){
    let cart = this.globalState.get('cart');
    const newCart = {...cart, status}
    this.updateCard$.next(newCart)
    // this.updateCartGql.mutate({input: {
    //   status: status,
    //   id: this.globalState.get('cart').id,
    // }}).pipe(switchMap(cart => 
    //   of(this.cartId$.next(null))
    // ))
    
  }
  private getCartIdFromCookies(){
    const id = this.cookieStorage.get(CART_ID)
    return id.length > 0 ? id : null
  }
  private createCart(){
    return this.createCartGql.mutate({input: { status: CartStatus.Open, items: [] }}).pipe(pluck('data', 'createCart')) as Observable<CreateCartMutation['createCart']>
  }
  public initCart() {
    return this.cartId$.pipe(
      distinctUntilChanged(), 
      switchMap(id => {
        if (id) { return this.cartGql.watch({input: { id }}).valueChanges.pipe(
          pluck('data', 'cart'), 
          catchError((e, obs) => this.createCart())
        )}
        else if (this.globalState.get('user')) {
          return this.cartGql.watch({input: { userId: this.globalState.get('user').id }}).valueChanges.pipe(pluck('data', 'cart'))
        } else {
          return this.createCart()
        }
      }),
      map(cart => {
        this.cartId$.next(cart.id);
        this.setCartIdCookie(cart.id)
        return cart
    }))
  }
  public setCartIdCookie(cartId?: CartQuery['cart']['id']){
    this.cookieStorage.put(CART_ID, cartId || '', { path: '/' })
  }


  // public addItem(item:) {
  //   this.analytics.addToCart([item])
  //   //get cart and mutate it
  //   cart.addItem(item)
  //   //save cart to storage
  //   this.saveCart(cart)
  //   //update cart
  //   this.globalState.set({cart})
  // }

  // addItemsToCart(barcodes: string[]){
  //   const input = barcodes.map(barcode => ({ barcode }))
  //   const fetchBarcodes$ = this.cartBarcodessGql.watch({ input }).valueChanges.pipe(
  //     pluck('data', 'cartBarcodes'),
  //     map((barcodes) => barcodes.map(barcode => ({ barcode, amount: 1 }))
  //   ))
  //   this.globalState.connect('cart', fetchBarcodes$, (state, items) => {
  //     for (const item of items){
  //       const existingItemsIncreased = state.cart.items.filter(p => p.barcode === item.barcode).map(i => { return { amount: i.amount + 1, barcode: i.barcode } })
  //       const newItems = 
  //     }
      
  //     for (const barcode of barcodes) {
  //       const existingItems = state.cart.cartItems.filter(i => i.barcode.barcode === barcode.barcode)
  //       existingItems.forEach(i => i.amount += 1)
  //       const newBarcodes = barcodes.filter(b => !existingItems.map(i=> i.barcode).includes(b.barcode))
  //       const newItems = newBarcodes.map(b => ({ barcode: b, amount: 1}))
  //       state.cart.items = [...existingItems, ...newItems]
  //       return state
  //     }
      
  //   })
    
  // }

  // public addItems(cart: Cart, items: CartItem[]) {
  //   this.analytics.addToCart(items)
  //   items.forEach((cartItem) => {
  //     cart.addItem(cartItem);
  //   });
  //   //save cart to storage
  //   this.saveCart(cart)
  //   //update cart
  //   this.globalState.set({cart})
  // }

  // public removeItem(cart: Cart, item: CartItem) {
  //   this.analytics.removeFromCart([item])
  //   cart.removeItem(item)
  //   //save cart to storage
  //   this.saveCart(cart)
  //   //update cart
  //   this.globalState.set({cart})
  //   // this.messageService.add('Удалено из корзины: ' + item.product.title);
  // }

  // public updateItemAmount(cart: Cart, item: CartItem, newAmount: number) {
  //   cart.updateItemAmount(item, newAmount)
  //   //save cart to storage
  //   this.saveCart(cart)
  //   //update cart
  //   // this.cart$.next(cart)
  //   this.globalState.set({cart})
  // }

  // public clearCart(cart: Cart) {
  //   cart.clearCart()
  //   this.cookieStorage.remove(COOKIE_KEY)
  //   //update cart
  //   // this.cart$.next(cart)
  //   this.globalState.set({cart})
  // }
}
