import { Schema } from 'dynamoose';
import { v4 } from 'uuid';

export const UserSchema = new Schema({
  id: { 
    type: String,
    hashKey: true,
    "default": v4()
  },
  email: { 
    type: String,
    // rangeKey: true,
    index: {
      global: true,
      rangeKey: 'id',
    }
  },
  firstName: { type: String },
  lastName: {type: String },
  userRole: { type: String, enum: ['admin', 'user', 'manager']},
  phone: { type: String },
  passwordSalt: { type: String },
  passwordHash: { type: String },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
