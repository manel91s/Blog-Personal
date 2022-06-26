import { Schema, model } from 'mongoose';
import { ICategory } from '../types/types';

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
});

const Category = model<ICategory>('Category', categorySchema);

export default Category;
