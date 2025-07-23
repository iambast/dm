const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  adminId: String,
  username: { type: String, unique: true },
  password: String,
});

module.exports = mongoose.model('Admin', adminSchema);
