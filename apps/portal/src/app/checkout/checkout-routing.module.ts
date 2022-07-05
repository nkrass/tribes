import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { BrandDefaultMeta, SEORoute } from '../shared/seoservice.service';
import { CartGuardService } from '../cart/shared/cart.guard';
import { CompleteComponent } from './complete/complete.component';

export const CheckoutRoutes: SEORoute[] = [
  new SEORoute({ 
    path: '', 
    component: CheckoutComponent, 
    canActivate: [CartGuardService],
    pathMatch: 'prefix', 
    data: {
    ...BrandDefaultMeta,
    title:"Заказ | 🛍 TRIBES ® - для Ярких и Смелых",
    description: "Ваш заказ в интернет магазине TRIBES - стиль большого города, приятные материалы и забота о комфорте"
  }}),
  new SEORoute({ path: 'order-complete', component: CompleteComponent, pathMatch: 'prefix', data: {
    ...BrandDefaultMeta,
    title: "Статус заказа | 🛍 TRIBES ® - для Ярких и Смелых",
    description: "Статус вашего заказ в интернет магазине TRIBES - стиль большого города, приятные материалы и забота о комфорте",
  }}),
  new SEORoute({
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    data: {
      ...BrandDefaultMeta,
      title: "Заказ | 🛍 TRIBES ® - для Ярких и Смелых",
      description: "Ваш заказ в интернет магазине TRIBES - стиль большого города, приятные материалы и забота о комфорте"
    }
  })
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
