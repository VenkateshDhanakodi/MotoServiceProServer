const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'categories', required: true },
  bikeBrand: { type: String , required: true},
  bikeModel: { type: String },
  customizationDetails: { type: String },
  pickUpAddress: { type: String },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed'],
    default: 'pending',
  },
  // Add any other fields you need
});

const serviceRequestModel = mongoose.model('serviceRequests', serviceRequestSchema);
module.exports = { serviceRequestModel };
