import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { CreateFeedbackInput, FeedbackType } from '../dto/create-feedback.input';
import { Feedback, FeedbackKey } from '../entities/feedback.model';
import { v4 } from 'uuid'
import { UpdateFeedbackInput } from '../dto/update-feedback.input';
import { FilterFeedbackInput } from '../dto/filter-feedback.input';
@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel('feedback')
    private readonly model: Model<Feedback, FeedbackKey>,
  ) {}

  async create(input: CreateFeedbackInput) {
    return this.model.create({
        ...input,
        id: v4(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
  }
  delete(id: FeedbackKey){
    return this.model.delete(id);
  }
  async update(key: FeedbackKey, input: UpdateFeedbackInput) {
    const model = await this.model.get(key);
    if (!model) throw new Error('Feedback not found');
    for (const prop in input) {
      if (prop !== "id"){
        (model as any)[prop] = (input as any)[prop];
      }
    }
    model.updatedAt = new Date();
    return this.model.update(model);
  }

  findOne(key: FeedbackKey) {
    return this.model.get(key);
  }

  async findByFilter(filter: FilterFeedbackInput) {
    const obj: any = {};
    const { limit, all } = filter;
    for (const prop in filter) {
      if (prop === "id" ) {
        obj[prop] = { 'eq': (filter as any)[prop] };
      }
      else if ( prop === 'all' || prop === 'limit') { }
      else obj[prop] = { 'contains': (filter as any)[prop] };
    }
    return all? this.model.scan().exec() : this.model.query(obj).limit(limit).exec();
  }
}
