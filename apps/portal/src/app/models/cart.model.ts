
// import { BarcodeQuery, CartBarcodesQuery, ProductQuery } from "gql/types"

// export interface ICartCookie { barcode: string, amount: number }
// export interface ICart { items: CartItem[], total: number }

// export class Cart implements ICart{
//   public items: CartItem[]
//   public total: number
//   public items_count: number
//   constructor(items: CartItem[]){
//     this.items = items
//     this.items_count = this.getItemsCount()
//     this.total = this.getTotal()
//   }
//   public getTotal() {
//     let total = 0;
//     this.items.forEach((cartItem: CartItem) => {
//       total += cartItem.amount * cartItem.barcode.product.priceSale;
//     });
//     return total;
//   }
//   public addItem(item:CartItem) {
//     if (this.getItemIds().includes(item.barcode)) {
//       this.items.forEach((cartItem) => {
//         if (cartItem.barcode === item.barcode) {
//           cartItem.amount += item.amount;
//         }
//       });
//     } else {
//       this.items.push(item);
//     }
//     this.total = this.getTotal()
//     this.items_count = this.getItemsCount()
//   }
//   public removeItem(item: CartItem) {
//     const indexToRemove = this.items.findIndex(element => element === item);
//     this.items.splice(indexToRemove, 1);
//     this.total = this.getTotal();
//     this.items_count = this.getItemsCount()
//   }
//   public updateItemAmount(item: CartItem, newAmount: number) {
//     this.items.forEach((cartItem) => {
//       if (cartItem.barcode === item.barcode) {
//         cartItem.amount = newAmount;
//       }
//     });
//     this.total = this.getTotal();
//     this.items_count = this.getItemsCount()
//   }
//   public clearCart() {
//     this.items = [];
//     this.total = this.getTotal();
//     this.items_count = this.getItemsCount()
//   }
//   private getItemIds() {
//     return this.items.map(cartItem => cartItem.barcode);
//   }
//   private getItemsCount(){
//     let count = 0
//     this.items.map(i => count += i.amount)
//     return count
//   }
// }
// export class CartItem {
//   constructor(public amount: number, public barcode: BarcodeQuery['barcode']) {}
// }
