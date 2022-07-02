import { Schema, model } from 'mongoose';
import { ITag } from '../types/types';

const tagSchema = new Schema<ITag>({
  name: { type: String, required: true },
});

const Tag = model<ITag>('Tag', tagSchema);

export default Tag;
