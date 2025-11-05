import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 30,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  dateOfBirth: {
    type: String,
    required: true
  },
  password: {
    type: String,
    minLength: 8,
    required: true
  }
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;