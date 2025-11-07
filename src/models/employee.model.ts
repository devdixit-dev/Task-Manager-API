import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 30,
    required: true
  },
  employeeEmail: {
    type: String,
    trim: true,
    required: true
  },
  employeeDOB: {
    type: String,
    required: true
  },
  employeePassword: {
    type: String,
    minLength: 8,
    required: true
  },
  employeeAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isEmployeeActive: {
    type: Boolean,
    default: true
  }
},{timestamps: true});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;