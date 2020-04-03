const {Schema, model, Types} = require('mongoose');


const TruckSchema = new Schema({
  model: {type: String, required: true},
  status: {type: String, required: true},
  dimensions: {
    width: {type: String, required: true},
    height: {type: String, required: true},
    length: {type: String, required: true},
  },
  payload: {type: String, required: true},
  created_by: {type: Types.ObjectId, ref: 'User', required: true},
  assigned_to: {type: Types.ObjectId, ref: 'User'},
});


module.exports = model('Truck', TruckSchema);
