import { Injectable } from '@nestjs/common';
import { SortOrder } from 'dynamoose/dist/General';
import { isNil, omitBy } from 'lodash';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { v4 } from 'uuid';
import { CreateCartInput } from '../dto/create-cart.input';
import { FilterCartInput } from '../dto/filter-cart.input';
import { UpdateCartInput } from '../dto/update-cart.input';
import { Cart, CartKey } from '../entities/cart.entity';

@Injectable()
export class CartService {
  constructor(@InjectModel('cart') private readonly model: Model<Cart, CartKey>){}
  
  create(input: CreateCartInput) {
    return this.model.create({
      ...input,
      id: v4(),
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  async update(cart: CartKey, input: UpdateCartInput) {
    const model = await this.model.get(cart);
    if (!model) throw new Error('Cart not found');
    for (const prop in input) {
      if (prop !== "id"){
        (model as any)[prop] = (input as any)[prop];
      }
    }
    model.updatedAt = new Date();
    return this.model.update(model);
  }
  delete(cart: CartKey){
    return this.model.delete(cart)
  }

  findOne(key: CartKey) {
    return this.model.get(key);
  }
  findByFilter(filter: FilterCartInput) {
    let { all, limit, id, userId, externalUserId, status, orderId } = filter;
    //Dynamodb supports only one Index at a time, so we need to distinguish which one to use in each case
    const filterObject: { [string: string]: string|number|undefined }= {
      id,
      userId:            !(id) && userId || undefined,
      externalUserId:    !(id || userId) && externalUserId || undefined,
      status:            !(id || userId || externalUserId) && status || undefined,
      orderId:           !(id || userId || externalUserId || status) && orderId || undefined,
    }
    const queryObj: {[string: string]: {}} = {}
    for (const prop in omitBy(filterObject, isNil)) {
      queryObj[prop] = { 'eq': filterObject[prop] }
    }
    return !all? this.model.query(queryObj).sort(SortOrder.descending).limit(limit).exec() : this.model.query(queryObj).sort(SortOrder.descending).all(100).exec();
  }
}
