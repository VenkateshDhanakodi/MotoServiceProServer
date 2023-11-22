const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    serviceId: {type: mongoose.Schema.Types.ObjectId, ref: 'services', required: true},
    date: {type: Date, default: Date.now()},
    status: {type: String, enum: ['pending', 'cofirmed', 'completed'], default: 'pending'}
},{versionKey: false});

const bookingModel = mongoose.model('bookings', bookingSchema);
module.exports = {bookingModel};