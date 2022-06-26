/* eslint-disable import/extensions */
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

// eslint-disable-next-line import/no-unresolved
import { IUser } from '../types/types';

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 8 },
  avatar: { type: String },
  token: { type: String },
  confirm: { type: Boolean, default: false },
  private: { type: Boolean, default: false },
  id_rol: { type: Number },
}, {
  timestamps: true,
});
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Comprobar password
userSchema.methods.checkPassword = async function (passwordForm: string) {
  return await bcrypt.compare(passwordForm, this.password);
};

const User = model<IUser>('User', userSchema);

export default User;
