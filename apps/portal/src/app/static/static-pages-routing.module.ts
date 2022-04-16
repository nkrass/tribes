import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrandDefaultMeta, BrandDescription, BrandTitle, SEORoute } from '../shared/seoservice.service';
import { SizesPageComponent } from './sizes/sizes.component';
import { AboutTribesBrandComponent } from './about-tribes-brand/about-tribes-brand.component';
import { SupportComponent } from './support/support.component';
import { ContactsComponent } from './contacts/contacts.component';
import { PolicyComponent } from './policy/policy.component';
import { AboutCompanyComponent } from './about-company/about-company.component';
import { OrdersPaymentInfoComponent } from './orders-payment-info/orders-payment-info.component';
import { ReturnsAndRefundsComponent } from './returns-and-refunds/returns-and-refunds.component';


export const StaticPagesRoutes = [
  new SEORoute({ path: 'sizes', component: SizesPageComponent, pathMatch: 'full', data: {
    ...BrandDefaultMeta,
    title: "Размерная сетка - Sizes table | 🛍 TRIBES ® - Больше своего времени",
    description: "Данные о всех размерах одежды бренда 🛍 TRIBES ® и измерения, на которые стоит ориентироваться при покупке."
  }}),
  new SEORoute({ path: 'about-tribes-brand', component: AboutTribesBrandComponent, pathMatch: 'full', data: {
    ...BrandDefaultMeta,
    title: "💎 Миссиия и ценности бренда " + BrandTitle,
    description: BrandDescription
  }}),
  new SEORoute({path: 'support', component: SupportComponent, pathMatch: 'full', data: {
    ...BrandDefaultMeta,
    title: "Поддержка клиентов | 🛍 TRIBES ® - Больше своего времени",
    description: "Связаться с нами по для получения помощи по вопросам заказов, качества и прочим ",
  }}),
  new SEORoute({ path: 'contacts', component: ContactsComponent, pathMatch: 'full', data: {
    ...BrandDefaultMeta,
    title:"Связаться с нами | 🛍 TRIBES ® - Больше своего времени",
    description: "🤝Связаться с нами по поводу сотрудничества или по другим вопросам | 🛍TRIBES®"
  }}),
  new SEORoute({ path: 'policy', component: PolicyComponent, pathMatch: 'full', data: {
    ...BrandDefaultMeta,
    title:"Политики | 🛍 TRIBES ® - Больше своего времени",
    description: "Политика конфиденциальности и Согласие с ПДН ООО Трайбс и Бренд TRIBES"
  }}),
  new SEORoute({ path: 'about-company', component: AboutCompanyComponent, pathMatch: 'full', data: {
    ...BrandDefaultMeta,
    title:"О компании | 🛍 TRIBES ® - Больше своего времени",
    description: "Реквизиты ООО Трайбс и Бренд 🛍TRIBES® - стиль большого города, приятные материалы и забота о комфорте",
  }}),
  new SEORoute({ path: 'orders-payment-info', component: OrdersPaymentInfoComponent, pathMatch: 'full', data: {
    ...BrandDefaultMeta,
    title:"Условия и информация | 🛍 TRIBES ® - Для ярких и смелых",
    description: "Условия и процедура заказа, оплаты, доставки и возвратов товаров 🛍TRIBES®"
  }}),
  new SEORoute({ path: 'returns-and-refunds', component: ReturnsAndRefundsComponent, pathMatch: 'full', data: {
    ...BrandDefaultMeta,
    title:"Возвраты товара и денег | 🛍 TRIBES ® - Для ярких и смелых",
    description: "Условия и правила возврата товаров и денег"
  }}),
  new SEORoute({ path: 'brand', pathMatch: 'full', redirectTo: 'about-tribes-brand', data: {
    ...BrandDefaultMeta
  }}),
  new SEORoute({ path: 'care', pathMatch: 'full', redirectTo: 'about-tribes-brand', data: {
    ...BrandDefaultMeta
  }}),
  new SEORoute({ path: 'v', pathMatch: 'full', redirectTo: 'about-tribes-brand', data: {
    ...BrandDefaultMeta
  }}),
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
]
  

@NgModule({
  imports: [RouterModule.forChild(StaticPagesRoutes)],
  exports: [RouterModule],
  providers: [
  ]
})
export class StaticPagesRoutingModule { }
