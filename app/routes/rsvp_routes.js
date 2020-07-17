// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for kickbacks
const Kickback = require('../models/kickback')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
// const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { kickback: { title: '', text: 'foo' } } -> { kickback: { text: 'foo' } }
// const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// CREATE
// POST
router.post('/kickbacks/:kickbackId/rsvps/', requireToken, (req, res, next) => {
  const rsvpData = req.body.guest
  // console.log(rsvpData)
  // console.log(req.body)
  const kickbackId = req.params.kickbackId

  // find the restaurant by its id
  Kickback.findById(kickbackId)
    .then(handle404)
    .then(kickback => {
      // add review to restaurant
      kickback.rsvps.push(rsvpData)
      // save restaurant
      return kickback.save()
    })
    // send responsne back to client
    .then(kickback => res.status(201).json({kickback: kickback}))
    .catch(next)
})

// DESTROY
// DELETE
router.delete('/kickbacks/:kickbackId/rsvps/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  const kickbackId = req.params.kickbackId
  Kickback.findById(kickbackId)
    .then(handle404)
    .then(kickback => {
      // console.log(id)
      // console.log(kickback)
      // console.log(kickback.rsvps)
      kickback.rsvps.id(id).remove()
      return kickback.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
