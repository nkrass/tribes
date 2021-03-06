import { Injectable } from '@nestjs/common';
import { SortOrder } from 'dynamoose/dist/General';
import { omitBy, isNil } from 'lodash';
import { InjectModel, Model, Document } from 'nestjs-dynamoose';
import { RegionFromBarcode } from '../../shared/barcode-region-extractor';
import { GoogleServices } from '../../shared/googledoc.service';
import { CreateProductInput } from '../dto/create-product.input';
import { FilterProductInput } from '../dto/filter-product.input';
import { UpdateProductInput } from '../dto/update-product.input';
import { Product, ProductKey } from '../entities/product.model';



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
    const unprocessed: Document<Product>[] = []
    for (let i = 0; i < products.length; i += 25) {
      const processed = await this.model.batchPut(products.slice(i, i + 25))
      unprocessed.push(...processed.unprocessedItems);
    }
    if (unprocessed.length > 0){
      for (let i = 0; i < unprocessed.length; i += 25) {
        const processed = await this.model.batchPut(unprocessed.slice(i, i + 25))
        unprocessed.push(...processed.unprocessedItems);
      }
    }
    return products;

  }
  delete(sku: ProductKey["sku"]){
    const region = RegionFromBarcode(sku)
    return this.model.delete({region, sku});
  }
  async update(sku: ProductKey["sku"], input: UpdateProductInput) {
    const region = RegionFromBarcode(sku)
    const model = await this.model.get({region, sku});
    if (!model) throw new Error('Product not found');
    for (const prop in input) {
      if (prop !== "sku"){
        model[prop] = input[prop];
      }
    }
    model.categoryGenderColor = `${input.category}#${input.gender}#${input.colorGroup}`
    model.categoryGender = `${input.category}#${input.gender}`
    model.categoryColor = `${input.category}#${input.colorGroup}`
    model.genderColor = `${input.gender}#${input.colorGroup}`
    model.updatedAt = new Date();
    return this.model.update(model);
  }

  findOne(sku: ProductKey['sku']) {
    const region = RegionFromBarcode(sku)
    return this.model.get({region, sku});
  }

  findBySkuFamily(skuFamily: string) {
    return this.model
      .query('skuFamily')
      .eq(skuFamily)
      .sort(SortOrder.descending)
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
    const { region, limit, category, gender, color, priceMin, priceMax, inStock = true, sku, skuFamily, orderIndex } = filter;
    let { all } = filter;
    const standardIndexes = (sku || skuFamily || orderIndex)
    //Dynamodb supports only one Index at a time, so we need to distinguish which one to use in each case
    const filterObject: { [string: string]: string|number|undefined }= {
      categoryGenderColor:  !(standardIndexes) && category && gender && color && `${category}#${gender}#${color}` || undefined,
      categoryGender:       !(standardIndexes || color) && category && gender && `${category}#${gender}` || undefined,
      genderColor:          !(standardIndexes || category) && gender && color && `${gender}#${color}` || undefined,
      sku,
      skuFamily:            !(sku) && skuFamily || undefined,
      orderIndex:           !(sku) && orderIndex || undefined,
      category:             !(standardIndexes || gender || color) && category || undefined,
      gender:               !(standardIndexes || category || color) && gender || undefined,
    }
    const queryObj: {[string: string]: unknown} = {}
    for (const prop in omitBy(filterObject, isNil)) {
      queryObj[prop] = { 'eq': filterObject[prop] }
    }
    inStock && (queryObj['stockBySkuIndex'] = { gt: 0 });
    //When filtering by price we need to search for the whole table
    priceMin && priceMax && (all = true) && (queryObj['priceSale'] = { between: [priceMin, priceMax] });
    return !all ? 
      this.model.query({region, ...queryObj}).sort(SortOrder.ascending).limit(limit).exec() 
      : this.model.query({region, ...queryObj}).sort(SortOrder.ascending).all(100).exec();
  }
}
