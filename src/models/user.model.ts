import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
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
    unique: true
  },
  companyEmail: {
    type: String,
    trim: true,
    required: true
  },
  companyContactNumber: {
    type: Number,
    minLength: 10,
    required: true
  },
  password: {
    type: String,
    minLength: 8,
    required: true
  },
  role: {
    type: String,
    default: 'Admin',
    enum: ['Admin', 'Developer']
  },
  verificationOTP: {
    type: String,
    trim: true,
    minLength: 6
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  employees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  }]
});

const User = mongoose.model('User', userSchema);

export default User;