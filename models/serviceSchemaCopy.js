const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'categories', required: true },
}, { versionKey: false });

const serviceModel = mongoose.model('services', serviceSchema);
module.exports = { serviceModel };
