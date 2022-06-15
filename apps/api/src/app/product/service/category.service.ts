import { Injectable } from '@nestjs/common';
import { uniqBy  } from 'lodash';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { Category } from '../entities/category.model';
import { ProductCategory } from '../entities/types/product-category.enum';
import { ProductGender } from '../entities/types/product-gender.enum';
import { Product, ProductKey } from '../entities/product.model';
import { ProductService } from './product.service';
import { ProductRegion } from '../entities/types/product-region.enum';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('product')
    private readonly productModel: Model<Product, ProductKey>,
    private readonly productService: ProductService
  ) {}


  findProductsByFilter(filter: {region, category?: ProductCategory, gender?: ProductGender, inStock: boolean, count: boolean, all: boolean, limit: number}) {
    return this.productService.findByFilter(filter)
  }
  async collectCategories(region: ProductRegion, gender: ProductGender) {
    if (gender) {
      const categories = await this.productModel.query({region, gender: {eq: gender}}).where('stock').gt(0).attributes(['category']).all(100).exec()
      const uniqs = uniqBy(categories, 'category')
      return uniqs.map(c => { const cat = new Category(); cat.name = c.category; cat.gender = gender; return cat})
    } else {
      const categories =  this.productModel.query({region, gender: {eq: 'men'}}).where('stock').gt(0).attributes(['category']).all(100).exec()
      const categories2 = this.productModel.query({region, gender: {eq: 'women'}}).where('stock').gt(0).attributes(['category']).all(100).exec()
      const uniqs = uniqBy([... await categories, ... await categories2], 'category')
      return uniqs.map(c => { const cat = new Category(); cat.name = c.category; return cat})
    }
  }
}
