const mongoose = require('mongoose')

const rsvpSchema = new mongoose.Schema({
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: String
})

module.exports = rsvpSchema
