import { Schema } from 'dynamoose';
import { v4 } from 'uuid'

export const ItemSchema = new Schema({
  id: { 
    type: String,
    hashKey: true,
    "default": v4
  },
  productBarcode: { 
    type: String,
    index: {
      global: true,
      rangeKey: 'id',
    }
  },
  registered: {
    type: Boolean,
    "default": true
  },
  externalRusCode: {
    type: String
  },
  external: {
    type: Array,
    schema: [
      { type: Object, schema: {
        provider: { type: String },
        code: { type: String },
      }}
    ]
  },
  userId: {
    type: String,
    index: { global: true, rangeKey: 'id' }
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
