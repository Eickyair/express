import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'product name must be provided']
  },
  price: {
    type: Number,
    required: [true, 'product price must be provided']
  },
  featured: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 4.5
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ['Liverpool', 'Elektra', 'Inbursa', 'Suburbia', 'Corona'],
      message: '{VALUE} is not supported'
    }
  }
})
export default model('Product', productSchema)