// import { Injectable } from '@angular/core';
// import { Observable ,  of, throwError } from 'rxjs';
// import { switchMap, retry, catchError } from 'rxjs';

// import { AuthService } from '../../shared/auth.service';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../../../../src/environments/environment';
// import { HttpErrorHandler } from '../../../shared/http-error-handler.service';

// @Injectable()
// export class OrderService {
  
//   constructor(
//     private authService: AuthService,
//     private http: HttpClient,
//     private handleError: HttpErrorHandler
//   ) {

//   }

//   public getOrders() {
//     return this.authService.user
//       .pipe(
//         switchMap((user) => {
//           if (user) {
//             const remoteUserOrders = `/users/${user.uid}/orders`;
//             return of(null);//this.store.list(remoteUserOrders).valueChanges();
//           } else {
//             return of(null);
//           }
//         })
//       );
//   }

//   public placeOrder(order: Order, total: number, user?: string):Observable<IOrderResponse> {
//     const orderWithMetaData = {
//       ...order,
//       total
//     };
//     return this.http.post<OrderResponse>(environment.apiUrl + "order", orderWithMetaData ).pipe(
//       retry(3), 
//       switchMap( (p) => {
//         if (!p.data) return throwError(() => new Error([p.errors].toString()))
//         return of(p.data)
//       }),
//       catchError(this.handleError.handleError<IOrderResponse>('sendOrder'))
//     );
//   }

//   public addAnonymousOrder(order: Order, total: number) {
//     const orderWithMetaData = {
//       ...order,
//       total
//     };
//     return of(null)
//   }
//   // private hashCode(str: string) {
//   //   let hash = 0;
//   //   if (str.length == 0) {
//   //       return hash;
//   //   }
//   //   for (let i = 0; i < str.length; i++) {
//   //       let char = str.charCodeAt(i);
//   //       hash = ((hash<<5)-hash)+char;
//   //       hash = hash & hash; // Convert to 32bit integer
//   //   }
//   //   return Math.abs(hash);
//   // }
//   // private constructOrderMetaData(order: Order) {
    
//   //   return {
//   //     number: this.hashCode(order.customer.firstname + order.customer.lastname + order.date),
//   //     date: order.date,
//   //     status: 'In Progress'
//   //   };
//   // }
// }
