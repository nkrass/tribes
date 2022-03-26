import { Injectable } from '@nestjs/common';
import { SortOrder } from 'dynamoose/dist/General';
import { omitBy, isNil } from 'lodash';
import { InjectModel, Model, Document } from 'nestjs-dynamoose';
import { CreateProductInput } from '../dto/create-product.input';
import { FilterProductInput } from '../dto/filter-product.input';
import { UpdateProductInput } from '../dto/update-product.input';
import { Product, ProductKey } from '../entities/product.model';
import { GoogleServices } from './googledoc.service';



@Injectable()
export class ProductService {
  constructor(
    @InjectModel('product')
    private readonly model: Model<Product, ProductKey>,
    private readonly googleServices: GoogleServices
  ) {}

  create(input: CreateProductInput) {
    return this.model.create({
      ...input,
      categoryGenderColor: `${input.category}#${input.gender}#${input.colorGroup}`,
      categoryGender: `${input.category}#${input.gender}`,
      categoryColor: `${input.category}#${input.colorGroup}`,
      genderColor: `${input.gender}#${input.colorGroup}`,
      stockBySkuIndex: input.stock > 0? input.skuIndex : 0,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
  async createBatch(){
    const products = await this.googleServices.getProducts();
    let unprocessed: Document<Product>[] = []
    for (let i = 0; i < products.length; i += 25) {
      let processed = await this.model.batchPut(products.slice(i, i + 25))
      unprocessed.push(...processed.unprocessedItems);
    }
    if (unprocessed.length > 0){
      for (let i = 0; i < unprocessed.length; i += 25) {
        let processed = await this.model.batchPut(unprocessed.slice(i, i + 25))
        unprocessed.push(...processed.unprocessedItems);
      }
    }
    return products;

  }
  delete(sku: ProductKey){
    return this.model.delete(sku);
  }
  async update(key: ProductKey, input: UpdateProductInput) {
    const model = await this.model.get(key);
    if (!model) throw new Error('Product not found');
    for (const prop in input) {
      if (prop !== "sku"){
        (model as any)[prop] = (input as any)[prop];
      }
    }
    model.categoryGenderColor = `${input.category}#${input.gender}#${input.colorGroup}`
    model.categoryGender = `${input.category}#${input.gender}`
    model.categoryColor = `${input.category}#${input.colorGroup}`
    model.genderColor = `${input.gender}#${input.colorGroup}`
    model.updatedAt = new Date();
    return this.model.update(model);
  }

  findOne(key: ProductKey) {
    return this.model.get(key);
  }

  findBySkuFamily(skuFamily: string) {
    return this.model
      .query('skuFamily')
      .eq(skuFamily)
      .exec();
  }
  findByCategory(category: string) {
    return this.model
      .query('category')
      .eq(category)
      .exec();
  }
  async getBatchBySkus(skus: ProductKey[]) {
    const resp = await this.model.batchGet(skus);
    let results = [...resp];
    while (resp.unprocessedKeys.length){
      const res = await this.model.batchGet(resp.unprocessedKeys as ProductKey[]);
      results = [...results, ...res];
    }
    return results;
  }
  async findByFilter(filter: FilterProductInput) {
    let { limit, all, category, gender, color, priceMin, priceMax, inStock = true, sku, skuFamily, wildberriesId } = filter;
    const standardIndexes = (sku || skuFamily || wildberriesId)
    //Dynamodb supports only one Index at a time, so we need to distinguish which one to use in each case
    const filterObject: { [string: string]: string|number|undefined }= {
      categoryGenderColor:  !(standardIndexes) && category && gender && color && `${category}#${gender}#${color}` || undefined,
      categoryGender:       !(standardIndexes || color) && category && gender && `${category}#${gender}` || undefined,
      genderColor:          !(standardIndexes || category) && gender && color && `${gender}#${color}` || undefined,
      sku,
      skuFamily:            !(sku) && skuFamily || undefined,
      wildberriesId:        !(sku) && wildberriesId || undefined,
      category:             !(standardIndexes || gender || color) && category || undefined,
      gender:               !(standardIndexes || category || color) && gender || undefined,
    }
    const queryObj: {[string: string]: {}} = {}
    for (const prop in omitBy(filterObject, isNil)) {
      queryObj[prop] = { 'eq': filterObject[prop] }
    }
    inStock && (queryObj['stockBySkuIndex'] = { gt: 0 });
    //When filtering by price we need to search for the whole table
    priceMin && priceMax && (all = true) && (queryObj['priceSale'] = { between: [priceMin, priceMax] });
    return !all? this.model.query(queryObj).sort(SortOrder.descending).limit(limit).exec() : this.model.query(queryObj).sort(SortOrder.descending).all(100).exec();
  }
  //   if (category && gender && color){
  //     const query = this.model.query('categoryGenderColor').eq(`${category}#${gender}#${color}`)
  //     return inStock? query.where('stock').gt(0).sort(SortOrder.descending).where('priceSale').between(priceMin, priceMax).limit(limit).exec() :
  //       query.where('priceSale').between(priceMin, priceMax).limit(limit).exec()
  //   } else if (category && gender) { 
  //     const query = this.model.query('categoryGender').eq(`${category}#${gender}`)
  //     return inStock? query.where('stock').gt(0).where('priceSale').between(priceMin, priceMax).sort(SortOrder.descending).limit(limit).exec() :
  //       query.where('priceSale').between(priceMin, priceMax).sort(SortOrder.descending).limit(limit).exec()
  //   } else if (gender && color) { 
  //     const query = this.model.query('genderColor').eq(`${gender}#${color}`)
  //     return inStock? query.where('stock').gt(0).where('priceSale').between(priceMin, priceMax).sort(SortOrder.descending).limit(limit).exec() :
  //       query.where('priceSale').between(priceMin, priceMax).sort(SortOrder.descending).limit(limit).exec()
  //   }


  //   for (const prop in filter) {
  //     if (prop === "sku" ||
  //        prop === "skuFamily" ||
  //        prop === "wildberriesId" ||
  //        prop === "category" ||
  //        prop === "gender" ||
  //        prop === 'categoryGenderColor' ||
  //        prop === 'categoryGender' ||
  //        prop === 'categoryColor' ||
  //        prop === 'genderColor'
  //     ) obj[prop] = { 'eq': (filter as any)[prop] };
  //     else if ( prop === 'all' || prop === 'limit' || prop === 'priceMax' || prop === 'priceMin' || prop === 'inStock') { }
  //     else obj[prop] = { 'contains': (filter as any)[prop] };
  //   }
  //   return all? 
  //     this.model.query(obj).where('priceSale').between(priceMin, priceMax).sort(SortOrder.descending).all().exec() : 
  //     this.model.query(obj).where('priceSale').between(priceMin, priceMax).sort(SortOrder.descending).limit(limit).exec();
  // }
}
