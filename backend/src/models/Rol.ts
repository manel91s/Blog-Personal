import { Schema, model } from 'mongoose';
import { IRol } from '../types/types';

const rolSchema = new Schema<IRol>({
  name: { type: String, required: true },
});

const Tag = model<IRol>('Rol', rolSchema);

export default Tag;
