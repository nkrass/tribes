import { Injectable } from '@nestjs/common';
import { SortOrder} from 'dynamoose/dist/General';
import { isNil, omitBy } from 'lodash';
import { InjectModel, Model, Document } from 'nestjs-dynamoose';
import { GoogleServices } from '../../shared/googledoc.service';
import { CreateBarcodeInput } from '../dto/create-barcode.input';
import { FilterBarcodeInput } from '../dto/filter-barcode.input';
import { UpdateBarcodeInput } from '../dto/update-barcode.input';
import { Barcode, BarcodeKey } from '../entities/barcode.model';



@Injectable()
export class BarcodeService {
  constructor(
    @InjectModel('barcode')
    private readonly model: Model<Barcode, BarcodeKey>,
    private readonly googleServices: GoogleServices
  ) {}

  create(input: CreateBarcodeInput) {
    return this.model.create({
      ...input,
      categoryGenderColorSize: `${input.category}#${input.gender}#${input.colorGroup}#${input.size}`,
      categoryGenderSize: `${input.category}#${input.gender}#${input.size}`,
      genderColorSize: `${input.gender}#${input.colorGroup}#${input.size}`,
      genderSize: `${input.gender}#${input.size}`,
      categorySize: `${input.category}#${input.size}`,
      categoryGender: `${input.category}#${input.gender}`,
      genderColor: `${input.gender}#${input.colorGroup}`,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
  async getBatch(barcodes: BarcodeKey[]) {
    const res = await this.model.batchGet(barcodes);
    let results = [...res];
    while (res.unprocessedKeys.length > 0){
      const resp = await this.model.batchGet(res.unprocessedKeys as BarcodeKey[]);
      results = [...results, ...resp];
    }
    return results;
  }
  async createBatch(){
    const barcodes = await this.googleServices.getBarcodes();
    const unprocessed: Document<Barcode>[] = []
    for (let i = 0; i < barcodes.length; i += 25) {
      const processed = await this.model.batchPut(barcodes.slice(i, i + 25))
      unprocessed.push(...processed.unprocessedItems);
    }
    if (unprocessed.length > 0){
      for (let i = 0; i < unprocessed.length; i += 25) {
        const processed = await this.model.batchPut(unprocessed.slice(i, i + 25))
        unprocessed.push(...processed.unprocessedItems);
      }
    }
    return barcodes;
  }
  delete(barcode: BarcodeKey){
    return this.model.delete(barcode);
  }
  async update(barcode: BarcodeKey, input: UpdateBarcodeInput) {
    const model = await this.model.get(barcode);
    if (!model) throw new Error('Product not found');
    for (const prop in input) {
      if (prop !== "barcode"){
        model[prop] = input[prop];
      }
    }
    model.categoryGenderColorSize = `${input.category}#${input.gender}#${input.colorGroup}#${input.size}`
    model.categoryGenderSize = `${input.category}#${input.gender}#${input.size}`
    model.genderColorSize = `${input.gender}#${input.colorGroup}#${input.size}`
    model.genderSize = `${input.gender}#${input.size}`
    model.categorySize = `${input.category}#${input.size}`
    model.categoryGender = `${input.category}#${input.gender}`
    model.genderColor = `${input.gender}#${input.colorGroup}`,
    model.updatedAt = new Date();
    return this.model.update(model);
  }

  findOne(key: BarcodeKey) {
    return this.model.get(key);
  }

  findBySku(sku: string) {
    return this.model
      .query('sku')
      .eq(sku)
      .exec();
  }
  async getBatchBySkus(skus: BarcodeKey[]) {
    const resp = await this.model.batchGet(skus);
    let results = [...resp];
    while (resp.unprocessedKeys.length){
      const res = await this.model.batchGet(resp.unprocessedKeys as BarcodeKey[]);
      results = [...results, ...res];
    }
    return results;
  }
  findByCategory(category: string) {
    return this.model.query('category').eq(category).where('stock').gt(0).exec();
  }
  findByFilter(filter: FilterBarcodeInput) {
    const { region, limit, category, gender, color, priceMin, priceMax, inStock = true, sku, skuFamily, size } = filter;
    let { all } = filter
    //Dynamodb supports only one Index at a time, so we need to distinguish which one to use in each case
    const standardIndexes = (sku || skuFamily )
    const filterObject: { [string: string]: string|number|undefined }= {
      categoryGenderColorSize:  !standardIndexes && category && gender && color && size && `${category}#${gender}#${color}#${size}` || undefined,
      categoryGenderSize:       !(standardIndexes || color) && category && gender && size && `${category}#${gender}#${size}` || undefined,
      genderColorSize:          !(standardIndexes || category) && gender && color && size && `${gender}#${color}#${size}` || undefined,
      genderSize:               !(standardIndexes || category || color) && gender && size && `${gender}#${size}` || undefined,
      categorySize:             !(standardIndexes || color || gender) && category && size && `${category}#${size}` || undefined,
      categoryGender:           !(standardIndexes || gender || color || size) && category && gender && `${category}#${gender}` || undefined,
      genderColor:              !(standardIndexes || category || size) && gender && color && `${gender}#${color}` || undefined,
      sku,
      skuFamily:            !(sku) && skuFamily || undefined,
      region:               !(sku || skuFamily) && region || undefined,
      category:             !(standardIndexes || gender || color) && category || undefined,
      gender:               !(standardIndexes || category || color) && gender || undefined,
    }
    const queryObj: {[string: string]: Record<string, unknown>} = {}
    for (const prop in omitBy(filterObject, isNil)) {
      queryObj[prop] = { 'eq': filterObject[prop] }
    }
    inStock && (queryObj['stock'] = { gt: 1 });
    priceMin && priceMax && (all = true) && (queryObj['priceSale'] = { between: [priceMin, priceMax] });
    return !all? this.model.query(queryObj).sort(SortOrder.descending).limit(limit).exec() : this.model.query(queryObj).sort(SortOrder.descending).all(100).exec();
  }
}
    
  //   const obj: any = {};
  //   // const { limit, all, category, gender, color, size } = filter;
  //   for (const prop in filter) {
  //     if (prop === "sku" ||
  //        prop === "barcode" ||
  //        prop === "wildberriesId" ||
  //        prop === "category" ||
  //        prop === "gender" ||
  //        prop === "size"
  //     ) obj[prop] = { 'eq': (filter as any)[prop] };
  //     else if ( prop === 'all' || prop === 'limit') { }
  //     else obj[prop] = { 'contains': (filter as any)[prop] };
  //   }
   
  //   if (category && gender && color && size){
  //     return this.model.query('categoryGenderColorSize').eq(`${category}#${gender}#${color}#${size}`)
  //     .where('stock').gt(0).sort(SortOrder.descending).limit(limit).exec();
  //   } else if (category && gender && size) { 
  //     return this.model.query('categoryGenderSize').eq(`${category}#${gender}#${size}`)
  //     .where('stock').gt(0).sort(SortOrder.descending).limit(limit).exec();
  //   } else if (gender && color && size) { 
  //     return this.model.query('genderColorSize').eq(`${gender}#${color}#${size}`)
  //     .where('stock').gt(0).sort(SortOrder.descending).limit(limit).exec();
  //   } else if (gender && size) { 
  //     return this.model.query('genderSize').eq(`${gender}#${size}`)
  //     .where('stock').gt(0).sort(SortOrder.descending).limit(limit).exec();
  //   } else if (category && size) { 
  //     return this.model.query('categorySize').eq(`${category}#${size}`)
  //     .where('stock').gt(0).sort(SortOrder.descending).limit(limit).exec();
  //   } else if (category && gender) {
  //     return this.model.query('categoryGender').eq(`${category}#${gender}`)
  //     .where('stock').gt(0).sort(SortOrder.descending).limit(limit).exec();
  //   } else if (gender && color) {
  //     console.log(gender, color)
  //     return this.model.query('genderColor').eq(`${gender}#${color}`)
  //     .where('stock').gt(0).sort(SortOrder.descending).limit(limit).exec();
  //   } 

  //   return all? 
  //     this.model.query(obj).sort(SortOrder.descending).all(100).exec() : 
  //     this.model.query(obj).sort(SortOrder.descending).limit(limit).exec();
  // }
// }
