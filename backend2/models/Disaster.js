const mongoose = require('mongoose');

const disasterSchema = new mongoose.Schema({
  name:String,
  contact:Number,
  location: String,
  type: String,
  description: String,
});

module.exports = mongoose.model('DisasterReport', disasterSchema);
