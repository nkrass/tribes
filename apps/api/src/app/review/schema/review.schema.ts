import { Schema } from 'dynamoose';
import { v4 } from 'uuid';

export const ReviewSchema = new Schema({
  id: { 
    type: String,
    hashKey: true,
    "default": v4()
  },
  sku: { 
    type: String,
    // rangeKey: true,
    index: {
      global: true,
      rangeKey: 'id',
    }
  },
  skuFamily: {
    type: String,
    index: {
      global: true,
      rangeKey: 'id',
    },
  },
  reviewText: { type: String },
  reviewAuthor: { type: String },
  reviewRating: { 
    type: Number, 
    index: {
      global: true,
      rangeKey: 'createdAt',
    }
  },
  reviewDate: { type: Date },
  reviewAnswer: { type: String },
  visible: { 
    type: Boolean, 
    default: true
  },
  userId: { type: String, index: {
    global: true,
    rangeKey: 'id',
  } },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});
