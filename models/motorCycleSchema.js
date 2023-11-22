const mongoose = require('mongoose');

const motorCycleSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    model: { type: Array, required: true }
}, { versionKey: false });

const motorCycleModel = mongoose.model('motorcyclelists', motorCycleSchema);
module.exports = { motorCycleModel };
