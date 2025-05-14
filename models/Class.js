const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  contentUrl: String,
  type: {
    type: String,
    enum: ['video', 'pdf', 'text', 'task'],
    default: 'video'
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);
