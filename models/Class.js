const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, default: Date.now },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  files: [String],
}, {
  timestamps: true // Agrega createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('Class', classSchema);
