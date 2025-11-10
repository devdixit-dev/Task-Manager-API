import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  company: {
    type: String,
  },
  title: {
    type: String,
    minLength: 4,
    maxLength: 40,
    required: true
  },
  desc: {
    type: String,
    minLength: 4,
    maxLength: 250,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending'
  },
  urgency: {
    type: String,
    enum: ['hard', 'medium', 'low'],
    default: 'medium'
  },
  done_at: {
    type: String
  },
  assign_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    comment: {
      type: String,
      minLength: 2,
      maxLength: 300
    }
  }]
});

const Task = mongoose.model('Task', taskSchema);

export default Task