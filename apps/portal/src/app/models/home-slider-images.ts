type THomeSliderImages = {
  title: string
  description: string
  image_path: string
  price_base?: number
  price_sale?: number
  currency?: string
  button_title?: string
  button_href?: string
  caption?: string
}
export class HomeSliderImages {
  public title!: string
  public description!: string
  public image_path!: string
  public price_base?: number
  public price_sale?: number
  public currency?: string
  public button_title?: string
  public button_href?: string
  public caption?: string
  constructor(data: THomeSliderImages){
    Object.assign(this, data);
  }
}
