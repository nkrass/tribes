import { environment } from "environments/environment"

const staticAssetsUrl = environment.staticAssetsUrl
export const PlaceholderImage = `${staticAssetsUrl}/static/img/products/product-placeholder.jpg`

export const ProductMock = {
  sku: null,
  nomenclature: null,
  title: null,
  titleFull: null,
  description: null,
  descriptionSeo: null,
  color: null,
  colorGroup: null,
  materials: [{}],
  priceBase: null,
  priceSale: null,
  stock: 0,
  status: null,
  category: null,
  gender: null,
  tags: null,
  collection: null,
  wildberriesId: null,
  crossSaleProducts: [],
  manufactured: null,
  notes: null,
  barcodes: [],
  createdAt: null,
  updatedAt: null,
  coverImage: PlaceholderImage,
  imagesSrc: [PlaceholderImage, PlaceholderImage, PlaceholderImage],
  videosSrc: [],
  sizes: null,
  variants: [],
  rating: null,
  reviews: []
}