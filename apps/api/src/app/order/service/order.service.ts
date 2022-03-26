import { Injectable } from '@nestjs/common';
import { SortOrder } from 'dynamoose/dist/General';
import { InjectModel, Model } from 'nestjs-dynamoose';
import * as uuid from 'uuid';
import { CreateOrderInput } from '../dto/create-order.input';
import { FilterOrderInput } from '../dto/filter-order.input';
import { UpdateOrderInput } from '../dto/update-order.input';
import { Order, OrderKey } from '../entities/order.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('order')
    private readonly model: Model<Order, OrderKey>,
  ) {}

  create(input: CreateOrderInput) {
    return this.model.create({
      ...input,
      id: uuid.v4(),
      createdAt: new Date()
    });
  }

  update(key: OrderKey, input: UpdateOrderInput) {
    return this.model.update(key, input);
  }

  findOne(key: OrderKey) {
    return this.model.get(key);
  }

  findByUserId(userId: string) {
    return this.model
      .query('userId')
      .eq(userId)
      .exec();
  }

  findByFilter(filter: FilterOrderInput) {
    const obj: any = {};
    const { limit, all } = filter;
    for (const prop in filter) {
      if (prop === "id" ||
         prop === "userId" ||
         prop === "status" ||
         prop === "productBarcode"
      ) obj[prop] = { 'eq': (filter as any)[prop] };
      else if ( prop === 'all' || prop === 'limit') { }
      else obj[prop] = { 'contains': (filter as any)[prop] };
    }
    return all? 
      this.model.query(obj).sort(SortOrder.descending).all().exec() : 
      this.model.query(obj).sort(SortOrder.descending).limit(limit).exec();
  }
}
