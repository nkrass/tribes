import { Inject, Injectable } from '@angular/core';
import { BaseCookieService } from '../../shared/storage/services/base-cookie.service';
import { switchMap, map, pluck, Observable, BehaviorSubject, Subject, distinctUntilChanged, catchError} from 'rxjs';
import { RxState } from '@rx-angular/state';
import { CartGQL, CartQuery, CartStatus, CreateCartGQL, CreateCartMutation, UpdateCartGQL } from '@tribes/data-access';
import { AppGlobalState, APP_GLOBAL_STATE } from '../../app-global.state';
import { AnalyticsService } from '../../shared/analytics.service';

const CART_ID = '_3bs_cart_id'

@Injectable()
export class CartService {
  // Init and generate some fixtures
  readonly cart$ = this.globalState.select('cart')  //new BehaviorSubject<Cart>(new Cart([]));
  private readonly cartShow$ = new BehaviorSubject<boolean>(false);
  private readonly user$ = this.globalState.select('user')

  private cartId$ = new BehaviorSubject(this.getCartIdFromCookies())
  private updateCard$ = new Subject<CartQuery['cart']>()
  constructor(
    private cookieStorage: BaseCookieService, 
    // private localStorage: BaseLocalStorage,
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
      }).filter(item => item.quantity && item.quantity > 0 ),
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
      totalItemsCount: newCartItems.reduce((acc, item) => acc + (item.quantity as number), 0),
      totalAmount: newCartItems.reduce((acc, item) => acc + (item.quantity as number) * (item.price as number), 0)}
    this.updateCard$.next(newCart)
  }
  public deleteItems(barcodes: CartQuery['cart']['cartItems'][0]['barcode'][]){
    const cart = this.globalState.get('cart');
    const newCartItems = cart.cartItems.filter(item => !barcodes.map(b => b?.barcode).includes(item.barcode?.barcode)).filter(item => ((item.quantity as number) >0))
    const newCart = {
      ...cart, 
      cartItems: newCartItems, 
      totalItemsCount: newCartItems.reduce((acc, item) => acc + (item.quantity as number), 0),
      totalAmount: newCartItems.reduce((acc, item) => acc + (item.quantity as number) * (item.price as number), 0)
    }
    this.updateCard$.next(newCart)
  }
  public addItems(cartItems: CartQuery['cart']['cartItems']){
    const cart = this.globalState.get('cart');
    ///cartItems is Sealed, so create new
    const newCartItems: CartQuery['cart']['cartItems'] = []
    const newQuantities: CartQuery['cart']['cartItems'] = []
    for (const cartItem of cartItems) {
      //icrease quantity if already in the cart
      cart.cartItems.map(item => {
        if (item.barcode?.barcode === cartItem?.barcode?.barcode) {
          newQuantities.push({ ...item, quantity: item.quantity? item.quantity + 1 : 1 })
        } else newQuantities.push(item)
      })
      if (!cart.cartItems.map(b =>b.barcode?.barcode).includes(cartItem?.barcode?.barcode)){
        //if no barcode in it
        newCartItems.push({...cartItem, quantity: 1, price: cartItem.price } as any)
      }
    }
    const newItems = [...newQuantities, ...newCartItems]
    this.analytics.addToCart(newItems)
    const newCart = {
      ...cart, 
      cartItems: newItems, 
      totalAmount: newItems.reduce((acc, item) => acc + (item.quantity as number)* (item.price as number), 0),
      totalItemsCount: newItems.reduce((acc, item) => acc + (item.quantity as number), 0)
    }
    this.updateCard$.next(newCart)
  }
  public clearCart(status: CartStatus){
    const cart = this.globalState.get('cart');
    const newCart = {...cart, status}
    this.updateCard$.next(newCart)   
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
}
