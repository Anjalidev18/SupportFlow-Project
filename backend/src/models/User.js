import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { USER_ROLES, USER_STATUSES } from '../constants/user.js';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name must not exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: USER_ROLES,
        message: 'Role must be one of: admin, agent, viewer',
      },
      default: 'agent',
    },
    status: {
      type: String,
      enum: {
        values: USER_STATUSES,
        message: 'Status must be one of: active, inactive',
      },
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.comparePassword = async function comparePassword(password) {
  return bcrypt.compare(password, this.passwordHash);
};

userSchema.statics.hashPassword = async function hashPassword(password, rounds) {
  return bcrypt.hash(password, rounds);
};

const User = mongoose.model('User', userSchema);

export default User;
