const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  originalname: { type: String, required: true },
  filename: { type: String, required: true },
  url: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Material", materialSchema);
