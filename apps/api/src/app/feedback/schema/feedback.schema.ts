import { Schema } from 'dynamoose';
import { v4 } from 'uuid'

export const FeedbackSchema = new Schema({
  id: { 
    type: String,
    hashKey: true,
    "default": v4
  },
  text: { type: String },
  name: { type: String },
  purpose: { 
    type: String,
    index: {
      global: true,
      rangeKey: 'createdAt',
    }
  },
  
  email: {
    type: String,
    index: { global: true, rangeKey: 'createdAt' }
  },
  userId: {
    type: String,
    index: { global: true, rangeKey: 'createdAt' }
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});
