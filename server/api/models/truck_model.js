const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const truckSchema = new Schema({
  name: String,
  model: String,
  isAssigned: Boolean,
  driver: {
    type: Schema.ObjectId,
    ref: 'User',
  },
});

const loadSchema = new Schema({
  shipper: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  driver: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  status: String,
  isAssigned: Boolean,
  detail: {
    weight: String,
    pickupAddress: String,
    deliveryAddress: String,
  },
});


module.exports = mongoose.model;
