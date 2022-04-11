const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema(
  {
    id: {
      type: Number
    },
    brand: {
      type: String
    },
    description: {
      type: String
    },
    image: {
      type: String
    },
    price: {
      type: Number
    }
  },
  {
    versionKey: false,
    collection: 'products',
    bufferTimeoutMS: 10000
  }
);

module.exports = {
  products: mongoose.model('products', productsSchema)
}

