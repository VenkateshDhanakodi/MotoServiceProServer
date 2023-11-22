const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  timestamp: { type: Date, default: Date.now() },
  status: { type: String, enum: ['success', 'pending', 'failed'], default: 'pending' },
}, { versionKey: false });

const transactionModel = mongoose.model('transactions', transactionSchema);
module.exports = { transactionModel };
