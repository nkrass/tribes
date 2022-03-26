import {Injectable, Inject} from '@angular/core'; 
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import {environment} from "../../../src/environments/environment"
import { resizedImgUrl } from '../../../api/utils';
import { ProductQuery } from 'gql/types';

const staticAssetsUrl = environment.staticAssetsUrl
const resizedImgCover = resizedImgUrl(staticAssetsUrl+"static/img/home/slider-new_year_2.jpg", 1520, 656)
const cdnUrl = environment.cdnUrl

export const BrandTitle = '🛍TRIBES ® - Больше своего времени'
export const BrandDescription = 'Одежда для людей, которые любят и ценят своё время. ⭐️⭐️⭐️⭐️⭐️ Современно. Актуально. Качественно. Деликатно.'
export const BrandImageDescription = BrandTitle + ' - ' + BrandDescription
export const BrandDefaultMeta = {
  "title": BrandTitle,
  "description": BrandDescription,
  "keywords": "больше своего времени, время для себя, мое время, одежда tribes, модная одежда, бренд tribes, на каждый день, одежда на каждый день, водолазки, толстовки, то что модно, качественная одежда, одежда из натуральных тканей, натуральные материалы, качественная одежда, российский бренд, городской стиль, качественные материалы",
  "og:image": resizedImgCover,
  "og:image:width":"1520",
  "og:image:height":"656",
  "og:image:alt": BrandImageDescription,
  "og:locale":"ru_RU",
  "og:type":"website",
  "og:title": BrandTitle,
  "og:description": BrandDescription,
  "og:url":"https://mytribes.ru/",
  "og:site_name": BrandTitle,
  "twitter:card": "summary_large_image",
  "twitter:site": "@tribes_official",
  "twitter:title": BrandTitle,
  "twitter:description": BrandDescription,
  "twitter:image":resizedImgCover,
  "twitter:image:alt": BrandImageDescription,
  "twitter:image:width":"1520",
  "twitter:image:height":"656",
  "defaultBrandTitle": BrandTitle,
  "defaultBrandDescription": BrandDescription
}
export class SEORoute {
  path!: string
  pathMatch!: string
  component?: any
  data = BrandDefaultMeta
  redirectTo?: string
  loadChildren?: any
  canActivate?: any[]
  constructor(data: SEORoute){
    this.path = data.path
    this.pathMatch = data.pathMatch
    this.component = data.component
    this.data = {...this.data, ...data.data}
    this.redirectTo = data.redirectTo;
    this.canActivate = data.canActivate;
    this.loadChildren = data.loadChildren;
    this.data["og:url"] = this.data["og:url"] + this.path
    this.data["og:description"] = this.data.description
    this.data["og:title"] = this.data.title
    this.data["twitter:description"] = this.data.description
    this.data["twitter:title"] = this.data.title
    this.data["twitter:description"] = this.data.description
    this.data["og:site_name"] = this.data.title
  }
}

@Injectable()
export class SEOService {
  public currentRouteData$ = new BehaviorSubject({...BrandDefaultMeta})
  constructor(
    private title: Title, 
    private meta: Meta, 
    @Inject(DOCUMENT) private doc: any
  ) { }
  setTitle(title: string) {
    this.title.setTitle(title);
  }
  setDescription(description: string){
    this.meta.updateTag({ name: 'description', content: description })
  }
  setMeta(meta: {[key: string]:any}) {
    Object.keys(meta).map(e => this.meta.updateTag({name: e, property: e, content: meta[e]}))
  }
  setCanonicalURL(url?:string) {
    let link = this.doc.querySelector("link[rel='canonical']")
    let canURL = url == undefined ? this.doc.URL : url;
    if (link) {
      link.setAttribute('href', canURL);
    } else {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', canURL);
      this.doc.head.appendChild(link);
    }
  }
  buildProductSeoAndSchema(product: ProductQuery['product']) {
      const {sku, title, description, descriptionSeo, category, materials, color, priceSale, status, stock, coverImage, priceBase} = product
      const page_title = title + " 🛍TRIBES® - Официальный интернет-магазин Россия 🇷🇺"
  
      this.setTitle(page_title)
      this.setDescription('⭐️⭐️⭐️⭐️⭐️ ' + description)
      this.setMeta({
        "og:url": 'https://mytribes.ru/product/' + sku,
        "og:description": '⭐️⭐️⭐️⭐️⭐️ ' + description,
        "keywords": title?.split(' ') + "для ярких и смелых одежда tribes, модная одежда, бренд tribes, на каждый день, одежда на каждый день, водолазки, толстовки, то что модно, качественная одежда, одежда из натуральных тканей, натуральные материалы, качественная одежда, российский бренд, городской стиль, качественные материалы",
        "og:image": coverImage,
        "og:image:url": coverImage,
        "og:image:alt": '⭐️⭐️⭐️⭐️⭐️ ' + description,
        "og:image:type": "image/jpeg",
        "og:image:width":"750",
        "og:image:height":"1000",
        "og:locale":"ru_RU",
        "og:type":"website",
        "og:title": page_title,
        "og:site_name": page_title,
        "twitter:card": "summary_large_image",
        "twitter:site":"@tribes_official",
        "twitter:title": page_title,
        "twitter:description": '⭐️⭐️⭐️⭐️⭐️ ' + description,
        "twitter:image": coverImage,
        "twitter:image:alt": '⭐️⭐️⭐️⭐️⭐️ ' + description,
        "twitter:image:width":"750",
        "twitter:image:height":"1000"
      })
      if (product.videosSrc.length){
        this.setMeta({'og:video': product.videosSrc[0], 'twitter:player': product.videosSrc[0]})
      }
      const scheme_product_id_ref = 'https://mytribes.ru/product/' + sku + '#product';
      
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        '@id': scheme_product_id_ref,
        name: title!,
        url: 'https://mytribes.ru/product/' + sku,
        description: '⭐️⭐️⭐️⭐️⭐️ ' + description,
        brand: {
          '@type': 'Brand',
          logo: staticAssetsUrl + 'static/img/logo/logo_tribes_woodmark.svg',
          // mainEntityOfPage: 'https://mytibes.ru/about-tribes-brand',

        },
        sameAs: [
          'https://facebook.com/tribesofficial',
          'https://twitter.com/TRIBES_Official',
          'https://www.instagram.com/tribes_brand/',
          'https://www.pinterest.ru/tribes_brand/pins/'
        ],
        sku: sku!,
        hasMerchantReturnPolicy: {
          'merchantReturnLink': 'https://mytribes.ru/returns-and-refunds',
          'inStoreReturnsOffered': true,
          'merchantReturnDays': 14,
          'identifier': 'https://mytribes.ru/returns-and-refunds',
          '@id': sku!
        },
        slogan: 'Для ярких и смелых- tribes',
        logo: staticAssetsUrl + 'static/img/logo/logo_tribes_woodmark.svg',
        material: materials?.map(m => `${m.material} ${m.quantity}`).join(','),
        category: category!,
        itemCondition: 'NewCondition',
        model: `${title} ${sku}`,
        manufacturer: 'ООО ТРАЙБС / TRIBES LLC',
        color: color!,
        image: { 
          "@type": "ImageObject", 
          url: coverImage!, 
          name: title!, 
          caption: '⭐️⭐️⭐️⭐️⭐️ ' + description,
          sameAs: 'https://mytribes.ru/product/' + sku
          },//cover_image,
        offers: {
          "@type": "AggregateOffer",
          highPrice: product.priceBase!,
          lowPrice: product.priceSale!,
          price: priceSale || priceBase!,
          priceCurrency: 'RUB',
          offerCount: 2,
          // '@id': scheme_product_id_ref,
          // sku, url: 'https://mytribes.ru/product/' + sku,
          offers: [
            { '@type': 'Offer',
              url: 'https://www.wildberries.ru/catalog/'+ product.wildberriesId +'/detail.aspx?targetUrl=BP',
              availability: stock! > 0 ? 'https://schema.org/InStock' : 'https://schema.org/LimitedAvailability',
            },
            { '@type': 'Offer',
              url: 'https://mytribes.ru/product/' + sku,
              availability: stock! > 0 ? 'https://schema.org/InStock' : 'https://schema.org/LimitedAvailability',
            }
          ]
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          // itemReviewed: { "@type": "Product", sku, name: title, '@id': scheme_product_id_ref },
          ratingValue: product.rating!,
          ratingCount: product.reviews?.length,
          bestRating: 5,
          worstRating: 1
        },
        review: product.reviews?.map(e => {
          return {
            '@type': 'Review',
            '@id': 'https://mytribes.ru/product/'+e.sku+'#product_review_'+e.id,
            isPartOf: scheme_product_id_ref,
            // itemReviewed: {
            //   '@type':'Product',
            //   image: e.image_path,
            //   name: title,
            // },
            author: {
              "@type": "Person",
              name: e.reviewAuthor
            },
            datePublished: e.reviewDate,
            name: Array.from(e.reviewAuthor).slice(0,30).join('').replace(/(\r\n|\n|\r)/gm,"") + '...',//[...(e.review as any)].slice(0,30).join('') + '...',
            reviewBody: e.reviewText,
            reviewRating: {
              '@type': 'Rating',
              bestRating: 5,
              ratingValue: e.reviewRating,
              worstRating: 1
            }
          }
        }),
      }
      return schema as any
  }
}