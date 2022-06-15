import { Schema } from 'dynamoose';

export const BarcodeSchema = new Schema({
  barcode: {
    type: String,
    hashKey: true
  },
  region: {
    type: String,
    index: {
      global: true,
      rangeKey: 'barcode',
    }
  },
  sku: { 
    type: String,
    index: {
      global: true,
      rangeKey: 'barcode',
    }
  },
  skuFamily: {
    type: String,
    index: {
      global: true,
      rangeKey: 'barcode',
    },
  },
  // wildberriesId: { 
  //   type: Number, 
  //   index: { 
  //     global: true, 
  //     rangeKey: 'barcode'
  //   }
  // },
  size: {
    type: String,
    index: {
      global: true,
      rangeKey: 'stock',
    }
  },
  stock: { type: Number},
  gender: {
    type: String,
    // enum: ["women", "men", "unisex", "unset"],
    index: {
      global: true,
      rangeKey: 'stock',
    }
  },
  categoryGenderColorSize: {
    type: String,
    index: {
      global: true,
      rangeKey: 'stock',
    }
  },
  categoryGenderSize: {
    type: String,
    index: {
      global: true,
      rangeKey: 'stock',
    }
  },
  categoryGender: {
    type: String,
    index: {
      global: true,
      rangeKey: 'stock',
    }
  },
  genderColorSize: {
    type: String,
    index: {
      global: true,
      rangeKey: 'stock',
    }
  },
  genderSize: {
    type: String,
    index: {
      global: true,
      rangeKey: 'stock',
    }
  },
  genderColor: {
    type: String,
    index: {
      global: true,
      rangeKey: 'stock',
    }
  },
  categorySize: { 
    type: String, 
    index: {
      global: true,
      rangeKey: 'stock',
    }
  },
  category: {
    type: String,
    // enum: ["skirts", "shorts", "sundresses", "turtlenecks", "dresses", "hoodies", "blouses", "tops", "sweaters", "trousers", "costumes", "jackets", "tshirts", "unset" ],
    index: {
      global: true,
      rangeKey: 'stock',
    },
  },
  status: {
    type: String,
    // enum: ["available", "soldout", "deleted", "draft"],
  },

  // title: { type: String },
  // titleFull: { type: String },
  // description: { type: String },
  // descriptionSeo: { type: String },
  color: { type: String },
  colorGroup: { type: String },
  // materials: { 
  //   type: Array, 
  //   schema: [
  //     {
  //       type: Object,
  //       schema: {
  //         material: { type: String },
  //         quantity: { type: Number }
  //       }
  //     }
  //   ] },
  priceBase: { type: Number },
  priceSale: { type: Number },
  tags: { type: String },
  // collection: { type: String },
  // images: {type: Array, schema: [{ type: String }]},
  // videos: {type: Array, schema: [{ type: String }]},
  // crossSale: {type: Array, schema: [{type: String}]},
  manufactured: { type: String },
  notes: { type: String },

  externalId: {
    type: Array,
    schema: [{
      type: Object,
      schema: {
        name: {
          type: String,
          required: true // Required will only be checked if `data` exists and is not undefined
        },
        id: {
          type: String,
          required: true // Required will only be checked if `data` exists and is not undefined
        }
      }
    }]
  },
  // nomenclature: {type: Object, schema: {
  //   name: { type: String },
  //   tnvd: { type: String },
  //   cost: { type: Number },
  //   price: { type: Number },
  // }},



  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});
