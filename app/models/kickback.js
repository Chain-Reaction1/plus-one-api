const mongoose = require('mongoose')
const rsvpSchema = require('./rsvpSchema')

const kickbackSchema = new mongoose.Schema({
  kickbackName: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rsvps: [rsvpSchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Kickback', kickbackSchema)
