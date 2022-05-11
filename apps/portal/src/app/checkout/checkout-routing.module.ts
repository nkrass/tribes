import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { BrandDefaultMeta, SEORoute } from '../shared/seoservice.service';
import { CartGuardService } from '../cart/shared/cart.guard';
import { CompleteComponent } from './complete/complete.component';

export const CheckoutRoutes = [
  new SEORoute({ 
    path: '', 
    component: CheckoutComponent, 
    canActivate: [CartGuardService],
    pathMatch: 'prefix', 
    data: {
    ...BrandDefaultMeta,
    title:"Заказ | 🛍 TRIBES ® - Больше своего времени",
    description: "Ваш заказ в интернет магазине TRIBES - стиль большого города, приятные материалы и забота о комфорте"
  }}),
  new SEORoute({ path: 'order-complete', component: CompleteComponent, pathMatch: 'prefix', data: {
    ...BrandDefaultMeta,
    title: "Статус заказа | 🛍 TRIBES ® - Больше своего времени",
    description: "Статус вашего заказ в интернет магазине TRIBES - стиль большого города, приятные материалы и забота о комфорте",
  }}),
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
]
  

@NgModule({
  imports: [RouterModule.forChild(CheckoutRoutes)],
  exports: [RouterModule],
  providers: [
    // AdminGuard,
    CartGuardService
  ]
})
export class CheckoutRoutingModule { }
