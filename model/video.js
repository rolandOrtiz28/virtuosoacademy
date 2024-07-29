const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  caption: { type: String },
  section: { type: mongoose.Schema.Types.ObjectId, ref: 'Section' }
});

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;
