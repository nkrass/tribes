import { Schema } from 'dynamoose';
import { v4 } from 'uuid'

export const CartSchema = new Schema({
  id: { 
    type: String,
    hashKey: true,
    "default": v4,
    index: {
      global: true, rangeKey: 'createdAt'
    }
  },
  items: { 
    type: Array,
    schema: [{
      type: Object,
      schema: { 
        barcode: { type: String},
        quantity: { type: Number },
        price: { type: Number },
        currency: { type: String },
        exchangeRate: { type: Number }
      }
    }] 
  },
  userId: {
    type: String, index: { global: true, rangeKey: 'createdAt' }
  },
  orderId: {
    type: String, index: { global: true, rangeKey: 'createdAt' }
  },
  status: {
    type: String, index: { global: true, rangeKey: 'createdAt' }
  },
  externalUserId: { type: String, index: { global: true, rangeKey: 'createdAt' } },
  external: {
    type: Array,
    schema: [
      { type: Object, schema: {
        provider: { type: String },
        code: { type: String },
      }}
    ]
  },
  promocodeId: {
    type: String
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
