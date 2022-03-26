import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { CreateItemInput } from '../dto/create-item.input';
import { FilterItemInput } from '../dto/filter-item.input';
import { UpdateItemInput } from '../dto/update-item.input';
import { Item, ItemKey } from '../entities/item.model';



@Injectable()
export class ItemService {
  constructor(
    @InjectModel('item')
    private readonly model: Model<Item, ItemKey>,
  ) {}

  async create(input: CreateItemInput) {
    const query = await this.findOne({id: input.id})
    if (query) return query;
    return this.model.create({
        ...input,
        createdAt: new Date(),
        updatedAt: new Date()
      });
  }
  delete(id: ItemKey){
    return this.model.delete(id);
  }
  async update(key: ItemKey, input: UpdateItemInput) {
    const model = await this.model.get(key);
    if (!model) throw new Error('Item not found');
    for (const prop in input) {
      if (prop !== "id"){
        (model as any)[prop] = (input as any)[prop];
      }
    }
    model.updatedAt = new Date();
    return this.model.update(model);
  }

  findOne(key: ItemKey) {
    return this.model.get(key);
  }

  async findByFilter(filter: FilterItemInput) {
    const obj: any = {};
    const { limit, all } = filter;
    for (const prop in filter) {
      if (prop === "id" ||
         prop === "productBarcode"
      ) {
        obj[prop] = { 'eq': (filter as any)[prop] };
      }
      else if ( prop === 'all' || prop === 'limit') { }
      else obj[prop] = { 'contains': (filter as any)[prop] };
    }
    return all? this.model.scan().exec() : this.model.query(obj).limit(limit).exec();
  }
}
