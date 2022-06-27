import { Schema, model } from 'mongoose';
import slug from 'slug';
import shortid from 'shortid';
import { IPost } from '../types/types';

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  image: { type: String, required: true },
  slug: { type: String },
  public: { type: Boolean },
  tags: [
    { type: Schema.Types.ObjectId, ref: 'Tag' }],
  id_user: { type: Schema.Types.ObjectId, ref: 'User' },
  id_category: { type: Schema.Types.ObjectId, ref: 'Category' },
}, {
  timestamps: true,
});

postSchema.pre('save', async function (next) {
  if (!this.isModified('slug')) {
    next();
  }
  this.slug = `${slug(this.title, '-')}_${shortid.generate()}`;
});

const Post = model<IPost>('Post', postSchema);

export default Post;
