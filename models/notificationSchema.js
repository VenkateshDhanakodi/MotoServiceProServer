const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipientUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  senderUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now() },
  isRead: { type: Boolean, default: false },
}, { versionKey: false });

const notificationModel = mongoose.model('notifications', notificationSchema);
module.exports = { notificationModel };
