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
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { kickback: { title: '', text: 'foo' } } -> { kickback: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /kickbacks
router.get('/kickbacks', (req, res, next) => {
  Kickback.find()
    .populate('guests')
    .then(kickbacks => {
      // `kickbacks` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return kickbacks.map(kickback => kickback.toObject())
    })
    // respond with status 200 and JSON of the kickbacks
    .then(kickbacks => res.status(200).json({ kickbacks: kickbacks }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /kickbacks/5a7db6c74d55bc51bdf39793
router.get('/kickbacks/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Kickback.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "kickback" JSON
    .then(kickback => res.status(200).json({ kickback: kickback.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /kickbacks
router.post('/kickbacks', requireToken, (req, res, next) => {
  // set owner of new kickback to be current user
  req.body.kickback.owner = req.user.id

  Kickback.create(req.body.kickback)
    // respond to succesful `create` with status 201 and JSON of new "kickback"
    .then(kickback => {
      res.status(201).json({ kickback: kickback.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /kickbacks/5a7db6c74d55bc51bdf39793
// router.patch('/kickbacks/:id', requireToken, removeBlanks, (req, res, next) => {
//   // if the client attempts to change the `owner` property by including a new
//   // owner, prkickback that by deleting that key/value pair
//   delete req.body.kickback.owner
//
//   kickback.findById(req.params.id)
//     .then(handle404)
//     .then(kickback => {
//       // pass the `req` object and the Mongoose record to `requireOwnership`
//       // it will throw an error if the current user isn't the owner
//       requireOwnership(req, kickback)
//
//       // pass the result of Mongoose's `.update` to the next `.then`
//       return kickback.updateOne(req.body.kickback)
//     })
//     // if that succeeded, return 204 and no JSON
//     .then(() => res.sendStatus(204))
//     // if an error occurs, pass it to the handler
//     .catch(next)
// })
// Adds a user id to the guests array for RSVP feature
router.patch('/kickbacks/:id/rsvps', requireToken, (req, res, next) => {
  delete req.body.kickback.owner
  Kickback.findById(req.params.id)
    .then(handle404)
    .then(kickback => {
      return kickback.updateOne(req.body.kickback)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})
// DESTROY
// DELETE /kickbacks/5a7db6c74d55bc51bdf39793
router.delete('/kickbacks/:id', requireToken, (req, res, next) => {
  Kickback.findById(req.params.id)
    .then(handle404)
    .then(kickback => {
      // throw an error if current user doesn't own `kickback`
      requireOwnership(req, kickback)
      // delete the kickback ONLY IF the above didn't throw
      kickback.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})
// Removing an RSVP
// router.delete('/kickbacks/:id/rsvps/:userid', requireToken, (req, res, next) => {
//   const userId = req.params.userid
//   const kickbackId = req.params.id
//   kickback.findById(kickbackId)
//     .then(handle404)
//     .then(kickback => {
//       console.log(kickback)
//       console.log(req.params.userid)
//       console.log(kickback.rsvps)
//       // filters out guests list to exclude user we want to delete
//       kickback.rsvps.filter(id => id !== userId)
//       // delete the kickback ONLY IF the above didn't throw
//       // kickback.guests.id(userId).remove()
//       return kickback.save()
//     })
//     // send back 204 and no content if the deletion succeeded
//     .then(() => res.sendStatus(204))
//     // if an error occurs, pass it to the handler
//     .catch(next)
// })

module.exports = router
