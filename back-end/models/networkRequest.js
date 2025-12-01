const mongoose = require('mongoose');
const {NetworkRequestStatus } = require('../models/enum');


const NetworkRequestSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    ssid: { type: String, default:""},
    login: { type: String, default:""},
    password: { type: String, default:""},
    status: { type: String,enum: Object.values(NetworkRequestStatus), required: true, default: NetworkRequestStatus.PENDING}, 
  },
  { timestamps: true }
);
  
  module.exports = mongoose.model('NetworkRequest', NetworkRequestSchema);
  