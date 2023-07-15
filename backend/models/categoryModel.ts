import mongoose, { Document } from 'mongoose';
import { ICategory } from './interfaces';

export const categorySchema = new mongoose.Schema<ICategory>({
  title: {
    type: String,
    required: true,
  },
});

const categoryModel = mongoose.model('Category', categorySchema);
export default categoryModel;
