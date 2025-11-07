import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 30,
    required: true
  },
  companyName: {
    type: String,
    minLength: 4,
    maxLength: 24,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  contactNumber: {
    type: Number,
    minLength: 10,
    required: true
  },
  password: {
    type: String,
    minLength: 8,
    required: true,
    select: false
  },
  role: {
    type: String,
    default: 'Admin',
    enum: ['Admin', 'Employee']
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;