const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
  lyrics: { type: String, required: true },
  owner: { type: Types.ObjectId, ref: 'Song' }
})

module.exports = model('Lyrics', schema);

