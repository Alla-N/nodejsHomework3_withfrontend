const {Schema, model, Types} = require('mongoose');


const LoadSchema = new Schema({
  name: String,
  status: String,
  created_by: String,
  assigned_to: String,
  type: String,
  dimensions: {
    width: Number,
    height: Number,
    length: Number,
  },
  payload: Number,
  links: [{type: Types.ObjectId, ref: 'Users'}],
});


module.exports = model('Load', LoadSchema);
