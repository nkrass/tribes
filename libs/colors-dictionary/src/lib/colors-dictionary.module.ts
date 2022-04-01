import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductColorGroupMatch } from './color.matching';

// @NgModule({
//   imports: [CommonModule],
// })
// export class ColorsDictionaryModule {}

const ColorsDictionaryTranslationRus = {
  "01":"Мультиколор",
  "02":"Рисунок / Принт",
  "03":"Черный",
  "04":"Белый",
  "05":"Красный",
  "06":"Бордовый",
  "07":"Коричневый",
  "08":"Горчичный",
  "09":"Бежевый",
  "10":"Серый",
  "11":"Золотой",
  "12":"Молочный",
  "13":"Розовый",
  "14":"Синий",
  "15":"Голубой",
  "16":"Желтый",
  "17":"Зеленый",
  "18":"Шафрановый",
  "19":"Чеддер",
  "20":"Изумрудный",
  "21":"Коралловый",
  "22":"Медный",
  "23":"Оливковый",
  "24":"Фиолетовый",
  "25":"Серебряный",
  "26":"Сиреневый",
  "27":"Хаки",
  "28":"Бежевый светлый",
  "29":"Синий светлый",
  "30":"Синий темный",
  "31":"Синий принт",
  "32":"Бежевый темный",
  "33":"Розовый светлый",
  "34":"Антрацитовый",
  "35":"Терракотовый",
  "36":"Индиго",
  "37":"Серый темный",
  "38":"Коричневый темный",
  "39":"Салатовый",
  "40":"Камуфляж",
  "41":"Шоколадный",
  "42":"Корица",
  "43":"Фисташковый",
  "44":"Какао",
  "45":"Мятный",
  "46":"Фуксия",
  "47":"Морская волна",
  "48":"Брусника",
  "49":"Капучино",
  "50":"Персик",
  "51":"Бирюзовый",
  "52":"Жемчужный",
  "53":"Апельсиновый",
  "54":"Оранжевый",
  "55": "Серо-голубой",
  "56": "Джинсовый",
  "57": "Пудровый",
  "58": "Пепельная роза"
}
const GeneralColorsDictionaryRus: { [String: string]: string } = {
  '04' : 'Белый',
  '03' : 'Черный',
  '10' : 'Серый',
  '13' : 'Розовый',
  '14' : 'Синий',
  '17' : 'Зеленый',
  '24' : 'Фиолетовый',
  // '01' : 'Мультиколор',
  // '02' : 'Рисунок / Принт',
  '05' : 'Красный',
  '07' : 'Коричневый',
  '09' : 'Бежевый',
  '15' : 'Голубой',
  '16' : 'Желтый',
  '54' : 'Оранжевый',
}
const GeneralColorGroupsCodes = [ '04', '03', '10', '13', '14', '17', '24', '05', '07', '09', '15', '16', '54' ];
// @Module({
//   controllers: [],
//   providers: [],
//   exports: [],
// })
export class ColorsDictionary {
  static GeneralColorGroupsCodes = GeneralColorGroupsCodes
  // static GeneralColorsDictionaryRus = GeneralColorsDictionaryRus
  // static ColorsDictionaryTranslationRus = ColorsDictionaryTranslationRus
  // static ProductColorGroupMatch = ProductColorGroupMatch
  static matchColorToGroup(str: string): string {
    return ProductColorGroupMatch[str]
  }
  static getColorName(code: string, lang= 'rus'): string {
    switch (lang) {
      case 'rus': return ColorsDictionaryTranslationRus[code]
      // case 'eng': return this.ColorsDictionaryTranslationEng[code]
      default: return ColorsDictionaryTranslationRus[code]
    }
  }
  static getColorGroupName(code: string, lang = 'rus'){
    switch(lang){
      case 'rus': return GeneralColorsDictionaryRus[code]
      // case 'eng': return this.GeneralColorsDictionaryEng[code]
      default: return GeneralColorsDictionaryRus[code]
    }
  }
}



