import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import { IUser } from './interfaces';

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    firstName: String,
    lastName: String,
    address: {
      country: String,
      city: String,
      address: String,
      postalCode: Number,
    },
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
          unique: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    wishlist: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
          unique: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

const userModel = mongoose.model<IUser>('User', userSchema);
export default userModel;
