import mongoose from 'mongoose';
import Category from './categoryModel';
import { IProduct, IReview } from './interfaces';

const reviewSchema = new mongoose.Schema<IReview>(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema<IProduct>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Category,
        required: true,
      },
    ],
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    intro: {
      type: String,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    tags: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    info: {
      weight: { type: String, required: true },
      dimentions: { type: String, required: true },
      colors: { type: String, required: true },
      material: { type: String, requird: true },
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    images: {
      type: [String],
      required: true,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model('Product', productSchema);
export default productModel;
