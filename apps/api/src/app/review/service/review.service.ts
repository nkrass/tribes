import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { CreateReviewInput } from '../dto/create-review.input';
import { FilterReviewInput } from '../dto/filter-review.input';
import { UpdateReviewInput } from '../dto/update-review.input';
import { Review, ReviewKey } from '../entities/review.model';
import { v4 } from 'uuid';
import { SortOrder } from 'dynamoose/dist/General';
import { isNil, omitBy } from 'lodash';


@Injectable()
export class ReviewService {
  constructor(
    @InjectModel('review')
    private readonly model: Model<Review, ReviewKey>,
  ) {}

  create(input: CreateReviewInput) {
    return this.model.create({
      ...input,
      id: v4(),
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
  delete(id: ReviewKey){
    return this.model.delete(id);
  }
  async update(key: ReviewKey, input: UpdateReviewInput) {
    const model = await this.model.get(key);
    if (!model) throw new BadRequestException('Review not found');
    for (const prop in input) {
      if (prop !== "id"){
        (model as any)[prop] = (input as any)[prop];
      }
    }
    model.updatedAt = new Date();
    return this.model.update(model);
  }

  findOne(key: ReviewKey) {
    return this.model.get(key);
  }

  findBySku(sku: string) {
    return this.model
      .query('sku')
      .eq(sku)
      .exec();
  }
  // calcAvgRating(sku: string) {
  //   Review.get()
  // }
  findBySkuFamily(skuFamily: string) {
    return this.model
      .query('skuFamily')
      .eq(skuFamily)
      .exec();
  }

  // async findByFilter(filter: FilterReviewInput) {
  //   const obj: any = {};
  //   const { limit, all } = filter;
  //   for (const prop in filter) {
  //     if (prop === "sku" ||
  //        prop === "skuFamily"
  //     ) {
  //       obj[prop] = { 'eq': (filter as any)[prop] };
  //     }
  //     else if ( prop === 'all' || prop === 'limit') { }
  //     else obj[prop] = { 'contains': (filter as any)[prop] };
  //   }
  //   return all? 
  //     this.model.scan().limit(limit).all() : 
  //     this.model.query(obj).sort(SortOrder.descending).limit(limit).exec();
  // }
  async findByFilter(filter: FilterReviewInput) {
    const { id, limit, sku, skuFamily, reviewRating, reviewDate, userId, visible } = filter;
    const { all } = filter;
    //Dynamodb supports only one Index at a time, so we need to distinguish which one to use in each case
    const filterObject: { [string: string]: string|number|boolean|undefined }= {
      id,
      sku:                  !(id) && sku || undefined,
      skuFamily:            !(id && sku)  && skuFamily || undefined,
      userId:               !(id && sku && skuFamily) && userId || undefined,
      reviewRating:         !(id && sku && skuFamily && userId) && reviewRating || undefined,
    }
    const queryObj: {[string: string]: unknown} = {}
    for (const prop in omitBy(filterObject, isNil)) {
      queryObj[prop] = { 'eq': filterObject[prop] }
    }
    const tempFilter = { reviewDate, visible }
    for ( const prop in tempFilter){
      queryObj[prop] = { 'contains': (filter as any)[prop] }
    };
    //When filtering by price we need to search for the whole table
    // (reviewRatingMax || reviewRatingMin) && (queryObj['reviewRating'] = { between: [reviewRatingMin || 1, reviewRatingMax || 5] });
    return !all? this.model.query(queryObj).sort(SortOrder.descending).limit(limit).exec() : this.model.query(queryObj).sort(SortOrder.descending).all(100).exec();
  }
}
