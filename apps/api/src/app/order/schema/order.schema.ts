import { Schema } from 'dynamoose';
import { v4 } from 'uuid';

export const OrderSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
    "default": v4()
  },
  productBarcode: {
    type: String,
    index: { global: true, rangeKey: 'id' }
  },
  userId: {
    type: String,
    index: [
      { global: true, rangeKey: 'id', name: 'userIdGlobalIndexById' },
      { global: true, rangeKey: 'productBarcode', name: 'userIdGlobalIndexByProductBarcode' },
      { global: true, rangeKey: 'createdAt', name: 'userIdGlobalIndexByCreatedAt' }
    ]

  },
  quantity: { type: Number },
  price: { type: Number },
  currency: { type: String },
  promocodeId: { type: String },
  payment: { type: String },
  status: { 
    type: String,
    index: {
      global: true,
      rangeKey: 'createdAt',
    }
  },
  deliveryInfo: { type: String },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
}, 
  // { "saveUnknown": ['delivery.**', 'payment.**'] }
);
