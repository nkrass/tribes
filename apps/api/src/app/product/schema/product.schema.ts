import { Schema } from 'dynamoose';

export const ProductSchema = new Schema({
  
  // barcode: {
  //   type: String,
  //   hashKey: true
  //   // index: {
  //   //   global: true,
  //   //   rangeKey: 'sku',
  //   // }
  // },
  sku: { 
    type: String,
    hashKey: true,
  },
  skuFamily: {
    type: String,
    index: {
      global: true,
      rangeKey: 'wildberriesId',
    },
  },
  skuIndex: {
    type: Number, 
    index: { 
      global: true, 
      rangeKey: 'stock'
    } 
  },
  wildberriesId: { 
    type: Number, 
    index: { 
      global: true, 
      rangeKey: 'stock'
    } 
  },
  nomenclature: {type: Object, schema: {
    name: { type: String },
    tnvd: { type: String },
    cost: { type: Number },
    price: { type: Number },
  }},
  sizes: { type: String },
  stock: { type: Number },
  // barcodes: {type: String},
  title: { type: String },
  titleFull: { type: String },
  description: { type: String },
  descriptionSeo: { type: String },
  color: { type: String },
  colorGroup: { type: String },
  materials: { 
    type: Array, 
    schema: [
      {
        type: Object,
        schema: {
          material: { type: String },
          quantity: { type: Number }
        }
      }
    ] },
  priceBase: { type: Number },
  priceSale: { type: Number },
  status: {
    type: String,
    enum: ["available", "soldout", "deleted", "draft"],
  },
  category: {
    type: String,
    enum: ["skirts", "shorts", "sundresses", "turtlenecks", "dresses", "hoodies", "blouses", "tops", "sweaters", "trousers", "costumes", "jackets", "tshirts", "unset" ],
    index: {
      global: true,
      rangeKey: 'stockBySkuIndex',
    }
  },
  gender: {
    type: String,
    enum: ["women", "men", "unisex", "unset"],
    index: {
      global: true,
      rangeKey: 'stockBySkuIndex',
    },
  },
  tags: { type: String },
  collection: { type: String },
  images: {type: Array, schema: [{ type: String }]},
  videos: {type: Array, schema: [{ type: String }]},
  
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
  crossSale: {type: Array, schema: [{type: String}]},
  manufactured: {type: String },
  notes: { type: String },

  categoryGenderColor: {
    type: String,
    index: {
      global: true,
      rangeKey: 'stockBySkuIndex' //contains
    }
  },
  categoryGender: {
    type: String,
    index: {
      global: true,
      rangeKey: 'stockBySkuIndex',
    }
  },
  genderColor: {
    type: String,
    index: {
      global: true,
      rangeKey: 'stockBySkuIndex'
    }
  },
  categoryColor: {
    type: String,
    index: {
      global: true,
      rangeKey: 'stockBySkuIndex'
    }
  },
  stockBySkuIndex: {
    type: Number,
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
