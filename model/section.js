const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }]
});

const Section = mongoose.model('Section', sectionSchema);
module.exports = Section;
