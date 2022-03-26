import { Injectable } from '@nestjs/common';
import { uniqBy  } from 'lodash';
import { InjectModel, Model } from 'nestjs-dynamoose';
// import { Barcode, BarcodeKey } from '../entities/barcode.model';
import { Category } from '../entities/category.model';
import { ProductCategory } from '../entities/product-category.enum';
import { ProductGender } from '../entities/product-gender.enum';
import { Product, ProductKey } from '../entities/product.model';
import { ProductService } from './product.service';
// import { Product, ProductKey } from '../entities/product.model';




@Injectable()
export class CategoryService {
  constructor(
    // @InjectModel('barcode')
    // private readonly barcodeModel: Model<Barcode, BarcodeKey>,
    @InjectModel('product')
    private readonly productModel: Model<Product, ProductKey>,
    private readonly productService: ProductService
  ) {}


  findProductsByFilter(filter: {category?: ProductCategory, gender?: ProductGender, inStock: boolean, count: boolean, all: boolean, limit: number}) {
    return this.productService.findByFilter(filter)
  }
  async collectCategories(gender: ProductGender) {
    if (gender) {
      const categories = await this.productModel.query('gender').eq(gender).where('stock').gt(0).attributes(['category']).all(100).exec()
      const uniqs = uniqBy(categories, 'category')
      return uniqs.map(c => { const cat = new Category(); cat.name = c.category; cat.gender = gender; return cat})
    } else {
      const categories =  this.productModel.query('gender').eq('men').where('stock').gt(0).attributes(['category']).all(100).exec()
      const categories2 = this.productModel.query('gender').eq('women').where('stock').gt(0).attributes(['category']).all(100).exec()
      const uniqs = uniqBy([... await categories, ... await categories2], 'category')
      return uniqs.map(c => { const cat = new Category(); cat.name = c.category; return cat})
    }
  }
}
