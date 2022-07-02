import { Schema, model } from 'mongoose';
import { IComment } from '../types/types';

const commentSchema = new Schema<IComment>({
  body: { type: String, required: true },
  id_user: { type: Schema.Types.ObjectId, ref: 'User' },
},{
    timestamps: true,
});

const Comment = model<IComment>('Comment', commentSchema);

export default Comment;
