const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
  title: { type: String, required: true },
  owner: { type: Types.ObjectId, ref: 'Band' }
})

module.exports = model('Song', schema);

