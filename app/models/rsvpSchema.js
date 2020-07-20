const mongoose = require('mongoose')

const rsvpSchema = new mongoose.Schema({
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = rsvpSchema
