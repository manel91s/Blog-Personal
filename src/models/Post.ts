import { Schema, model } from 'mongoose';
import { IPost } from '../types/types';

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  slug: { type: String },
  public: { type: Boolean },
  id_user: { type: Number },
}, {
  timestamps: true,
});

const Post = model<IPost>('Post', postSchema);

export default Post;
