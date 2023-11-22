const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['General service', 'Repairs', 'Upgrades'], // Allowed category names
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
}, { versionKey: false });

const categoryModel = mongoose.model('categories', categorySchema);
module.exports = { categoryModel };
