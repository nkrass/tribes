import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HomeSliderImages } from '../../models/home-slider-images';
import { environment } from '../../../../src/environments/environment'
import { resizedImgUrl } from '../../shared/utils/utils.utils';
const staticAssetsUrl = environment.staticAssetsUrl

@Injectable()
export class HomeSliderImagesService {
  public staticAssetsUrl: string = staticAssetsUrl
  // constructor(private angularFireDatabase: AngularFireDatabase) {}

  getSliderImages(): Observable<HomeSliderImages[]> {
    // return this.angularFireDatabase.list<Promo>('promos').valueChanges();
    const init = [
      {
        title: "В кругу <br> близких",
        title_class: "invisible text-uppercase",
        description: "Зима 20/21 в уютной одежде TRIBES",
        description_class: "invisible",
        caption: "Теплые и нежные вещи для зимы",
        caption_class: "invisible",
        image_path: resizedImgUrl(this.staticAssetsUrl + "static/img/home/slider/slider-new_year_2.jpg", 1600, 350),
        image_class: "full-width",
        button_text: "👉Зимняя коллекция",
        button_class: "",
        button_routerlink: "/catalog",
        button_query_params: {q: ['зима']}
      },
      { title: "Теплая <br> осень",
        title_class: " text-uppercase",
        description: "Осенняя коллекция TRIBES 2020",
        description_class: "invisible",
        caption: "Нежные и приятные телу",
        caption_class: "invisible",
        image_path: resizedImgUrl(this.staticAssetsUrl + "static/img/home/slider/slider-04.jpg", 500, 500),
        button_text: "Мягкая коллекция 2020",
        button_class: "",
        button_routerlink: "/catalog",
        button_query_params: {q: 'осень'}
      },
      { title: "Краски <br> лета",
        title_class: "red text-uppercase",
        description: "Летняя коллекция TRIBES 2020",
        description_class: "invisible",
        caption: "Нежные и приятные вещи летнего сезона",
        caption_class: "invisible",
        image_path: resizedImgUrl(this.staticAssetsUrl + "static/img/home/slider/slider-01.jpg", 500, 500),
        button_text: "Летняя коллекция",
        button_class: "",
        button_routerlink: "/catalog",
        button_query_params: {q: 'летняя'}
      },
      {
        title: "Океан <br> нежности",
        title_class:"dark-blue text-uppercase",
        caption: "Теплые и нежные водолазки из натуральных материалов",
        caption_class: "invisible",
        description: "Коллекция Couleurs de Navajo",
        description_class: "invisible",
        image_path: resizedImgUrl(this.staticAssetsUrl + "static/img/home/slider/slider-02.jpg", 500, 500),
        button_text: "Коллекция Couleurs de Navajo",
        button_class: "",
        button_routerlink: "/catalog",
        button_query_params: { q:'couleurs'}
      },
      {
        title: "Элегантность <br> в каждом изгибе",
        title_class: "text-uppercase",
        caption: "Элегантные вечерние платья",
        caption_class: "invisible",
        description: "",
        description_class: "invisible",
        image_path: resizedImgUrl(this.staticAssetsUrl + "static/img/home/slider/slider-03.jpg", 500, 500),
        button_text: "Коллекция Délice d’Assiniboine",
        button_class: "",
        button_routerlink: "/catalog",
        button_query_params: {q: 'delice'}
      }
    ]
    const data: HomeSliderImages[] = init.map(e => new HomeSliderImages(e))
    return of(data);
  }
}
